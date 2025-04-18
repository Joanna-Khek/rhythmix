# Generated by Django 5.2 on 2025-04-16 10:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0010_remove_songprediction_song_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="SavedSongs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("song_name", models.CharField(max_length=255)),
                ("song_artists", models.CharField(max_length=255)),
                ("song_genre", models.CharField(max_length=255)),
                ("song_link", models.URLField()),
                ("score", models.FloatField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
