from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FlagoSerializer
from .models import Flago

# Create your views here.

class FlagoView(viewsets.ModelViewSet):
    serializer_class = FlagoSerializer
    queryset = Flago.objects.all()
