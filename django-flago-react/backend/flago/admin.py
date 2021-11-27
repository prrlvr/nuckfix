from django.contrib import admin
from .models import Flago

class FlagoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Flago, FlagoAdmin)
