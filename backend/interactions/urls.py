from django.urls import path
from . import views

urlpatterns = [
    path("blog_posts", views.get_blog_posts),
    path("blog_posts/<int:post_id>", views.get_blog_post_by_id),
    path("send_anonymous_message", views.send_anonymous_message)
]
