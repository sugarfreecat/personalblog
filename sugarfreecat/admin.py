from django.contrib import admin

from .models import Link, Post, Tab, Link

admin.site.register(Post)
admin.site.register(Tab)
admin.site.register(Link)