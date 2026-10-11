from django.contrib import admin
from .models import Link, Post, Tab

# 1. Define your custom class containing the code editor scripts
class CodeEditorAdmin(admin.ModelAdmin):
    class Media:
        # Pass raw asset URLs as strings (do NOT use <script> tags here)
        css = {
            'all': (
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.css',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/monokai.css',
                'sugarfreecat/css/codemirror.css',  # Replaced with standard relative static path
            )
        }
        js = (
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/htmlmixed/htmlmixed.js',
            # htmlmixed requires xml, javascript, and css dependencies to run properly
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/xml/xml.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/css/css.js',
            'sugarfreecat/js/codemirror_init.js', # Replaced with standard relative static path
        )

# 2. Register your models USING the custom class configuration
admin.site.register(Post, CodeEditorAdmin)
admin.site.register(Tab, CodeEditorAdmin)
admin.site.register(Link, CodeEditorAdmin)