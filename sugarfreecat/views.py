from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from itertools import groupby
from datetime import date

from .models import Tab, Post, Link

def layout(request):
    tabs = Tab.objects.all()
    template = loader.get_template("sugarfreecat/layout.html")
    context = {"tabs": tabs}
    return HttpResponse(template.render(context, request))
    

def index(request):
    tabs = Tab.objects.all().filter(is_active=True)
    posts = Post.objects.all().order_by('-pub_date')[:5]  # Get the 5 most recent posts
    return render(request, "sugarfreecat/index.html", {"tabs": tabs, "posts": posts})

def about(request):
    tabs = Tab.objects.all().filter(is_active=True)
    return render(request, "sugarfreecat/about.html", {"tabs": tabs})

def blog(request):
    tabs = Tab.objects.all().filter(is_active=True)
    post_dates = (Post.objects.dates('pub_date', 'month', order='DESC'))
    posts = Post.objects.all().order_by('-pub_date')

    tag = request.GET.get('tag')
    if tag:
        posts = posts.filter(tags__icontains=tag)

    return render(request, "sugarfreecat/blog.html", {"tabs": tabs, "posts": posts, "post_dates": post_dates})

def archive(request, year, month):
    tabs = Tab.objects.all().filter(is_active=True)
    posts = Post.objects.filter(pub_date__year=year, pub_date__month=month).order_by('-pub_date')

    archive_date = date(int(year), int(month), 1)
    return render(request, "sugarfreecat/archive.html", {"tabs": tabs, "posts": posts, "archive_date": archive_date})

def post_detail(request, post_id):
    post = Post.objects.get(id=post_id)
    tabs = Tab.objects.all().filter(is_active=True)

    previous_post = Post.objects.filter(id__lt=post.id).order_by('-id').first()
    next_post = Post.objects.filter(id__gt=post.id).order_by('id').first()

    audio_url = "/static/sugarfreecat/music/" + post.song
    return render(request, "sugarfreecat/post_detail.html", {
        "tabs": tabs, 
        "post": post, 
        "previous_post": previous_post,
        "next_post": next_post,
        "audio_url": audio_url
    })

def links(request):
    tabs = Tab.objects.all().filter(is_active=True)
    links = Link.objects.filter(is_active=True).order_by('category', 'text')
    grouped_links = {
        category: list(items)
        for category, items in groupby(links, key=lambda link: link.category)
    }
    return render(request, "sugarfreecat/links.html", {"tabs": tabs, "links": grouped_links})

def theme(request):
    tabs = Tab.objects.all().filter(is_active=True)
    return render(request, "sugarfreecat/theme.html", {"tabs": tabs})

def music_player(request):
    return render(request, "sugarfreecat/components/audio_player.html")