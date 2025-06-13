from rest_framework import serializers
from .models import BlogPost, Message


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', "image_link",
                  'description', 'date_created', 'date_updated']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'content', 'date_sent']
