from django.db import models


class Tab(models.Model):
    text = models.CharField(max_length=50)
    link = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.text


class Post(models.Model):
    text = models.TextField()
    title = models.CharField(max_length=200)
    pub_date = models.DateField(default=None, null=True, blank=True)
    _created_at = models.DateTimeField(auto_now_add=True)
    _updated_at = models.DateTimeField(auto_now=True)
    tags = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title