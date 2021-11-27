from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('uuid', 'name', 'expiry_date', 'score', 'quantity', 'unit', 'tags')
