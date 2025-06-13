from django.contrib import admin
from .models import BlogPost, Message


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "date_created", "date_updated"]
    search_fields = ["title"]
    list_per_page = 10


class MessageAdmin(admin.ModelAdmin):
    list_display = ["content", "date_sent"]


# Registration of admin models
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Message, MessageAdmin)
