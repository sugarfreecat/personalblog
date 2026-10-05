from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("sugarfreecat/", include("sugarfreecat.urls")),
    path("admin/", admin.site.urls),
]