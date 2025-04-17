"""Translates Django models to JSON and vice versa."""

from rest_framework import serializers
from .models import (
    APICheck,
    PromptPrediction,
    AttributeValues,
    SongPrediction,
    SavedSongs,
)


class APICheckSerializer(serializers.ModelSerializer):
    """Serializer for the APICheck model."""

    class Meta:
        model = APICheck
        fields = ("id", "service", "status")


class PromptPredictionSerializer(serializers.ModelSerializer):
    """Serializer for the InitialPrediction model."""

    class Meta:
        model = PromptPrediction
        fields = ("id", "prompt", "graph_state", "created_at")


class AttributeValuesSerializer(serializers.ModelSerializer):
    """Serializer for the AttributeValues model."""

    class Meta:
        model = AttributeValues
        fields = ("id", "attributes_values", "created_at")


class SongPredictionSerializer(serializers.ModelSerializer):
    """Serializer for the SongPrediction model."""

    class Meta:
        model = SongPrediction
        fields = ("id", "recommendation", "created_at")


class SavedSongsSerializer(serializers.ModelSerializer):
    """Serializer for the SavedSongs model."""

    class Meta:
        model = SavedSongs
        fields = (
            "id",
            "song_name",
            "song_artists",
            "song_genre",
            "song_link",
            "score",
            "created_at",
        )
