from djongo import models


class BlogPost(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=2500)
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message: {self.content[:50]}..."
