import os
from rest_framework import viewsets, status
from .serializers import (
    APICheckSerializer,
    PromptPredictionSerializer,
    AttributeValuesSerializer,
    SongPredictionSerializer,
    SavedSongsSerializer,
)
from .models import (
    APICheck,
    PromptPrediction,
    AttributeValues,
    SongPrediction,
    SavedSongs,
)
from rest_framework.response import Response
from dotenv import load_dotenv
from rhythmix.configs import settings
from rhythmix.recommender import graph

load_dotenv(settings.ROOT / ".env")


# Create your views here.
class APICheckViewSet(viewsets.ViewSet):
    # permission_classes = [permissions.AllowAny]
    queryset = APICheck.objects.all()
    serializer_class = APICheckSerializer

    def list(self, request):
        # Define required keys and map them to service names
        keys_required = ["OPENAI_API_KEY", "QDRANT_API_KEY", "QDRANT_ENDPOINT"]

        missing_keys = [key for key in keys_required if not os.getenv(key)]
        print(f"Missing keys: {missing_keys}")

        # Reset all statuses to False initially
        for service in keys_required:
            APICheck.objects.update_or_create(
                service=service, defaults={"status": False}
            )

        # Update status
        for key in keys_required:
            if key not in missing_keys:
                APICheck.objects.update_or_create(
                    service=key, defaults={"status": True}
                )

        # Serialie and return all service statuses
        serializer = self.serializer_class(self.queryset, many=True)

        if missing_keys:
            return Response(
                {
                    "status": False,
                    "message": f"Missing environment variables: {', '.join(missing_keys)}",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "status": True,
                "message": "All required API keys are set.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class PromptPredictionViewSet(viewsets.ModelViewSet):
    """ViewSet for InitialPrediction model."""

    queryset = PromptPrediction.objects.all()
    serializer_class = PromptPredictionSerializer

    def create(self, request):
        prompt = request.data.get("prompt")

        if not prompt:
            return Response(
                {"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Save to database by updating the existing record
        prediction, _ = PromptPrediction.objects.update_or_create(
            id=1, defaults={"prompt": prompt}
        )
        prediction.save()

        # Inital state of the graph
        initial_state = {"user_query": prompt}
        graph_thread = {"configurable": {"thread_id": 0}}

        # Run the graph
        graph.compiled_graph.invoke(input=initial_state, config=graph_thread)

        # Get the initial attributes and save them in session state
        graph_state = graph.compiled_graph.get_state(graph_thread)

        # Save the graph_state to model
        prediction.graph_state = graph_state
        prediction.save()

        serializer = self.get_serializer(prediction)
        return Response(serializer.data)


class AttributeValuesViewSet(viewsets.ModelViewSet):
    """ViewSet for AttributeValues model."""

    queryset = AttributeValues.objects.all()
    serializer_class = AttributeValuesSerializer

    def create(self, request):
        attributes_values = request.data.get("attributes_values")

        # Save to database by updating the existing record
        attribute_values, _ = AttributeValues.objects.update_or_create(
            id=1, defaults={"attributes_values": attributes_values}
        )
        attribute_values.save()

        serializer = self.get_serializer(attribute_values)
        return Response(serializer.data)


class SongPredictionViewSet(viewsets.ModelViewSet):
    """ViewSet for SongPrediction model."""

    queryset = SongPrediction.objects.all()
    serializer_class = SongPredictionSerializer
    graph_thread = {"configurable": {"thread_id": 0}}

    def create(self, request):
        attribute_instance = AttributeValues.objects.order_by("-created_at").first()
        if not attribute_instance or not attribute_instance.attributes_values:
            return Response(
                {"error": "Attribute values are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        graph_state = attribute_instance.attributes_values
        print("Graph State to inject into LangGraph:", graph_state)

        # 2. Update LangGraph state with the user's attributes
        try:
            graph.compiled_graph.update_state(self.graph_thread, graph_state)
            updated_graph_state = graph.compiled_graph.get_state(self.graph_thread)
            print("Updated Graph State:", updated_graph_state)
        except Exception as e:
            return Response(
                {"error": f"LangGraph error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # 3. Get predictions
        recommendations = graph.compiled_graph.invoke(None, config=self.graph_thread)
        print("Recommendations:", recommendations["llm_response"])

        # 3. Save updated prediction in DB
        prediction, _ = SongPrediction.objects.update_or_create(
            id=1,  # or omit this if you want to save a new prediction each time
            defaults={"recommendation": recommendations["llm_response"]},
        )
        prediction.save()

        # 4. Return prediction
        serializer = self.get_serializer(prediction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SavedSongsViewSet(viewsets.ModelViewSet):
    """ViewSet for SavedSongs model."""

    queryset = SavedSongs.objects.all()
    serializer_class = SavedSongsSerializer

    def list(self, request):
        saved_songs = self.queryset.all()
        serializer = self.get_serializer(saved_songs, many=True)
        return Response(serializer.data)

    def create(self, request):
        song_name = request.data.get("song_name")
        song_artists = request.data.get("song_artists")
        song_genre = request.data.get("song_genre")
        song_link = request.data.get("song_link")
        score = request.data.get("score")

        # Save to database by creating a new record
        saved_song = SavedSongs.objects.create(
            song_name=song_name,
            song_artists=song_artists,
            song_genre=song_genre,
            song_link=song_link,
            score=score,
        )

        serializer = self.get_serializer(saved_song)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
