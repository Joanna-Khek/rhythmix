from django.db import models


# Create your models here.
class APICheck(models.Model):
    service = models.CharField(max_length=50, unique=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.service


class InitialPrediction(models.Model):
    """Model to store initial predictions."""

    prompt = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt  # Return the first 50 characters of the prediction
