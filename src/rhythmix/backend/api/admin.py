from django.contrib import admin
from .models import APICheck, InitialPrediction

# Register your models here.
admin.site.register(APICheck)
admin.site.register(InitialPrediction)
