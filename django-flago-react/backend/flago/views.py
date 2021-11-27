from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ArticleSerializer
from .models import Article

# Create your views here.

class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
