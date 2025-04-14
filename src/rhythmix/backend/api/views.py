import os
from rest_framework import viewsets, status
from .serializers import APICheckSerializer, InitialPredictionSerializer
from .models import APICheck, InitialPrediction
from rest_framework.response import Response
from dotenv import load_dotenv
from rhythmix.configs import settings
from rhythmix.recommender import graph

load_dotenv(settings.ROOT / ".env")


print(f"OPENAI KEY: {os.getenv("OPENAI_API_KEY")}")


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


class InitialPredictionViewSet(viewsets.ModelViewSet):
    """ViewSet for InitialPrediction model."""

    queryset = InitialPrediction.objects.all()
    serializer_class = InitialPredictionSerializer

    def create(self, request):
        prompt = request.data.get("prompt")

        if not prompt:
            return Response(
                {"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Inital state of the graph
        initial_state = {"user_query": prompt}
        graph_thread = {"configurable": {"thread_id": 0}}
        # Run the graph
        graph.compiled_graph.invoke(input=initial_state, config=graph_thread)

        # Get the initial attributes and save them in session state
        graph_state = graph.compiled_graph.get_state(graph_thread)

        return Response(
            {"prompt": prompt, "graph_state": graph_state},
            status=status.HTTP_201_CREATED,
        )
