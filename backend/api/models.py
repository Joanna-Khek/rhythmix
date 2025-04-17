from django.db import models


# Create your models here.
class APICheck(models.Model):
    service = models.CharField(max_length=50, unique=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.service


class PromptPrediction(models.Model):
    """Model to store initial predictions."""

    prompt = models.TextField()
    graph_state = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt


class AttributeValues(models.Model):
    attributes_values = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.attributes_values


class SongPrediction(models.Model):
    """Model to store song predictions."""

    recommendation = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.recommendation


class SavedSongs(models.Model):
    song_name = models.CharField(max_length=255)
    song_artists = models.CharField(max_length=255)
    song_genre = models.CharField(max_length=255)
    song_link = models.URLField()
    score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.song_name
