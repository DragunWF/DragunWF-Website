from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost, Message


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "date_created",
                    "date_updated", "is_published",
                    "image_display"]
    search_fields = ["title"]
    list_filter = ["is_published", "date_created"]
    list_per_page = 10
    fields = ("title", "image", "description", "is_published")

    def get_fields(self, request, obj=None):
        # Show image_display only when editing (obj exists)
        fields = list(super().get_fields(request, obj))
        if obj:  # Editing existing object
            if "image_display" not in fields:
                fields.insert(fields.index("image") + 1, "image_display")
        else:  # Creating new object
            if "image_display" in fields:
                fields.remove("image_display")
        return fields

    def get_readonly_fields(self, request, obj=None):
        # Make image_display readonly (always)
        readonly = list(super().get_readonly_fields(request, obj))
        if obj and "image_display" not in readonly:
            readonly.append("image_display")
        return readonly

    def image_display(self, obj):
        if obj.image:
            return format_html(
                '''
                <div style="display: inline-block; position: relative;">
                    <a href="{0}" target="_blank" rel="noopener noreferrer" 
                    style="text-decoration: none; display: block;">
                        <img src="{0}" 
                            style="max-height: 100px; 
                                    max-width: 200px; 
                                    border: 1px solid #ddd; 
                                    border-radius: 4px; 
                                    padding: 4px; 
                                    cursor: pointer;
                                    transition: transform 0.2s;"
                            onmouseover="this.style.transform='scale(1.05)'"
                            onmouseout="this.style.transform='scale(1)'"
                            alt="Blog Image Cover" />
                    </a>
                    <small style="display: block; margin-top: 4px; color: #666;">
                        Click to view full size
                    </small>
                </div>
                ''',
                obj.image.url
            )
        return "-"
    image_display.short_description = "Blog Image Cover"


class MessageAdmin(admin.ModelAdmin):
    list_display = ["content", "date_sent"]
    search_fields = ["content"]
    list_per_page = 10


# Registration of admin models
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Message, MessageAdmin)
