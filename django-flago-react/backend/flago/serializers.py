from rest_framework import serializers
from .models import Flago

class FlagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flago
        fields = ('id', 'title', 'description', 'completed')
