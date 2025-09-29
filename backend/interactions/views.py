from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from .models import BlogPost, Message
from .serializers import BlogPostSerializer, MessageSerializer


@api_view(["GET"])
def get_blog_posts(request: HttpRequest) -> Response:
    """Get paginated blog posts"""
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

    # Get all blog posts ordered by creation date
    blog_posts = BlogPost.objects.all().order_by('-date_created')

    # Create paginator
    paginator = Paginator(blog_posts, page_size)

    try:
        paginated_posts = paginator.page(page)
    except PageNotAnInteger:
        paginated_posts = paginator.page(1)
    except EmptyPage:
        paginated_posts = paginator.page(paginator.num_pages)

    # Serialize the posts
    serializer = BlogPostSerializer(paginated_posts, many=True)

    return Response({
        'results': serializer.data,
        'pagination': {
            'current_page': paginated_posts.number,
            'total_pages': paginator.num_pages,
            'total_count': paginator.count,
            'page_size': page_size,
            'has_next': paginated_posts.has_next(),
            'has_previous': paginated_posts.has_previous(),
            'next_page': paginated_posts.next_page_number() if paginated_posts.has_next() else None,
            'previous_page': paginated_posts.previous_page_number() if paginated_posts.has_previous() else None,
        }
    }, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_blog_post_by_id(request: HttpRequest, post_id: int) -> Response:
    """Get a specific blog post by post ID"""
    blog_post = get_object_or_404(BlogPost, id=post_id)
    serializer = BlogPostSerializer(blog_post)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
