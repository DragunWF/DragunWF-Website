from rest_framework import serializers
from .models import BlogPost, Message


class BlogPostSerializer(serializers.ModelSerializer):
    """
    Serializer for BlogPost model with Cloudinary image field support.

    Includes both the new 'image' field (Cloudinary) and legacy 'image_link' field
    for backward compatibility and smooth migration.

    The 'image' field is custom serialized to ensure proper URL extraction from Cloudinary.
    """

    # Custom serializer field for Cloudinary image
    image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'image',        # New Cloudinary image field (custom serialized)
            'image_link',   # Legacy image link field (deprecated)
            'description',
            'date_created',
            'date_updated'
        ]

    def get_image(self, obj):
        """
        Custom method to serialize Cloudinary image field properly.

        Returns the full URL if the image exists, otherwise returns None.
        This ensures the frontend gets a clean URL string to work with.
        """
        if obj.image:
            try:
                # Get the URL from the Cloudinary field
                return obj.image.url
            except (AttributeError, ValueError):
                # Fallback if there's an issue with the Cloudinary field
                return None
        return None


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'content', 'date_sent']
