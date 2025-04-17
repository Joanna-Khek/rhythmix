from django.contrib import admin
from .models import (
    APICheck,
    PromptPrediction,
    AttributeValues,
    SongPrediction,
    SavedSongs,
)

# Register your models here.
admin.site.register(APICheck)
admin.site.register(PromptPrediction)
admin.site.register(AttributeValues)
admin.site.register(SongPrediction)
admin.site.register(SavedSongs)
