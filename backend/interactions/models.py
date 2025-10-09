from djongo import models
from cloudinary.models import CloudinaryField


class BlogPost(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)

    image = CloudinaryField('Cover Image', null=True, blank=True)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True, verbose_name="Published")

    # DEPRECATED: Use Cloudinary for image hosting
    image_link = models.CharField(
        max_length=500,
        null=True,
        blank=True,
        default=""
    )

    def __str__(self):
        return self.title


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=2500)
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message: {self.content[:50]}..."
