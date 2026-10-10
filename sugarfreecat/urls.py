from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("blog/", views.blog, name="blog"),
    path("blog/post/<int:post_id>/", views.post_detail, name="post"),
]