from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from .models import BlogPost, Message
from .serializers import BlogPostSerializer, MessageSerializer


@api_view(["GET"])
def get_blog_posts(request: HttpRequest) -> Response:
    """Get all blog posts"""
    blog_posts = BlogPost.objects.all()
    serializer = BlogPostSerializer(blog_posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
