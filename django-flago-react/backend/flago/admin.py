from django.contrib import admin
from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'name', 'expiry_date', 'score', 'quantity', 'unit', 'tags')

# Register your models here.

admin.site.register(Article, ArticleAdmin)
