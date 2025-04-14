"""Translates Django models to JSON and vice versa."""

from rest_framework import serializers
from .models import APICheck, InitialPrediction


class APICheckSerializer(serializers.ModelSerializer):
    """Serializer for the APICheck model."""

    class Meta:
        model = APICheck
        fields = ("id", "service", "status")


class InitialPredictionSerializer(serializers.ModelSerializer):
    """Serializer for the InitialPrediction model."""

    class Meta:
        model = InitialPrediction
        fields = ("id", "prompt", "created_at")
