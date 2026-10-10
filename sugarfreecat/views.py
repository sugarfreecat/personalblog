from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

from .models import Tab, Post

def layout(request):
    tabs = Tab.objects.all()
    template = loader.get_template("sugarfreecat/layout.html")
    context = {"tabs": tabs}
    return HttpResponse(template.render(context, request))
    

def index(request):
    tabs = Tab.objects.all()
    posts = Post.objects.all().order_by('pub_date')[:5]  # Get the 5 most recent posts
    return render(request, "sugarfreecat/index.html", {"tabs": tabs, "posts": posts})

def post_detail(request, post_id):
    post = Post.objects.get(id=post_id)
    tabs = Tab.objects.all()
    return render(request, "sugarfreecat/post_detail.html", {"tabs": tabs, "post": post})