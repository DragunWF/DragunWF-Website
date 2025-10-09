from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpRequest

from .models import BlogPost, Message
from .serializers import BlogPostSerializer, MessageSerializer


@api_view(["GET"])
def get_blog_posts(request: HttpRequest) -> Response:
    """
    Get paginated blog posts with Djongo-compatible query handling

    Fixed to handle boolean field filtering issues with Djongo MongoDB connector.
    Uses manual filtering instead of QuerySet.filter() to avoid SQL translation errors.
    """
    # Get query parameters
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 4)

    try:
        page = int(page)
        page_size = int(page_size)
        # Limit page_size to prevent abuse
        page_size = min(page_size, 20)
    except (ValueError, TypeError):
        page = 1
        page_size = 4

    try:
        # Get all blog posts ordered by creation date
        # Using .all() instead of .filter() to avoid Djongo boolean field issues
        all_blog_posts = BlogPost.objects.all().order_by('-date_created')

        # Manual filtering for published posts to avoid Djongo SQL translation issues
        published_posts = [
            post for post in all_blog_posts if post.is_published]

        # Calculate pagination manually
        total_count = len(published_posts)
        total_pages = (total_count + page_size -
                       1) // page_size if total_count > 0 else 1

        # Validate page number
        if page < 1:
            page = 1
        elif page > total_pages and total_pages > 0:
            page = total_pages

        # Calculate slice indices for pagination
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        paginated_posts = published_posts[start_index:end_index]

        # Calculate pagination info
        has_next = page < total_pages
        has_previous = page > 1
        next_page = page + 1 if has_next else None
        previous_page = page - 1 if has_previous else None

        # Serialize the posts
        serializer = BlogPostSerializer(paginated_posts, many=True)

        return Response({
            'results': serializer.data,
            'pagination': {
                'current_page': page,
                'total_pages': total_pages,
                'total_count': total_count,
                'page_size': page_size,
                'has_next': has_next,
                'has_previous': has_previous,
                'next_page': next_page,
                'previous_page': previous_page,
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        # Comprehensive error handling for database issues
        return Response({
            'error': 'Failed to retrieve blog posts',
            'message': 'There was an issue accessing the blog data. Please try again later.',
            'results': [],
            'pagination': {
                'current_page': 1,
                'total_pages': 0,
                'total_count': 0,
                'page_size': page_size,
                'has_next': False,
                'has_previous': False,
                'next_page': None,
                'previous_page': None,
            }
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_blog_post_by_id(request: HttpRequest, post_id: int) -> Response:
    """
    Get a specific blog post by post ID with Djongo-compatible error handling

    Uses try-catch approach instead of get_object_or_404 to handle potential
    Djongo database issues more gracefully.
    """
    try:
        # Try to get the blog post by ID
        blog_post = BlogPost.objects.get(id=post_id)

        # Check if the post is published
        if not blog_post.is_published:
            return Response(
                {"error": "Blog post not found or not published"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except BlogPost.DoesNotExist:
        return Response(
            {"error": "Blog post not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        # Handle any database connection or other issues
        return Response(
            {
                "error": "Failed to retrieve blog post",
                "message": "There was an issue accessing the blog data. Please try again later."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["POST"])
def send_anonymous_message(request: HttpRequest) -> Response:
    """Create a new anonymous message"""
    content = request.data.get("content")

    if not content:
        return Response(
            {"error": "Content is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create the message
    message = Message.objects.create(content=content)
    serializer = MessageSerializer(message)

    return Response(
        {
            "message": "Message sent successfully",
            "data": serializer.data
        },
        status=status.HTTP_201_CREATED
    )
