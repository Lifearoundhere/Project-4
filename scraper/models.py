from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Document(models.Model):
    document = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, related_name='documents', on_delete=models.CASCADE)

    def __str__(self):
        return self.url
