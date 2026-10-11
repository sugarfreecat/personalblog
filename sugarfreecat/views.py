from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from itertools import groupby

from .models import Tab, Post, Link

def layout(request):
    tabs = Tab.objects.all()
    template = loader.get_template("sugarfreecat/layout.html")
    context = {"tabs": tabs}
    return HttpResponse(template.render(context, request))
    

def index(request):
    tabs = Tab.objects.all().filter(is_active=True)
    posts = Post.objects.all().order_by('pub_date')[:5]  # Get the 5 most recent posts
    return render(request, "sugarfreecat/index.html", {"tabs": tabs, "posts": posts})

def about(request):
    tabs = Tab.objects.all().filter(is_active=True)
    return render(request, "sugarfreecat/about.html", {"tabs": tabs})

def blog(request):
    tabs = Tab.objects.all().filter(is_active=True)
    months = (
        Post.objects
        .dates('pub_date', 'month', order='DESC')
    )

    posts_by_month = [
        {
            'month': month,
            'posts': Post.objects.filter(
                pub_date__year=month.year,
                pub_date__month=month.month
            ).order_by('-pub_date')
        }
        for month in months
    ]
    return render(request, "sugarfreecat/blog.html", {"tabs": tabs, "posts_by_month": posts_by_month})

def post_detail(request, post_id):
    post = Post.objects.get(id=post_id)
    tabs = Tab.objects.all().filter(is_active=True)
    return render(request, "sugarfreecat/post_detail.html", {"tabs": tabs, "post": post})

def links(request):
    tabs = Tab.objects.all().filter(is_active=True)
    links = Link.objects.filter(is_active=True).order_by('category')
    grouped_links = {
        category: list(items)
        for category, items in groupby(links, key=lambda link: link.category)
    }
    return render(request, "sugarfreecat/links.html", {"tabs": tabs, "links": grouped_links})

def theme(request):
    tabs = Tab.objects.all().filter(is_active=True)
    return render(request, "sugarfreecat/theme.html", {"tabs": tabs})