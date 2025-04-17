from .views import (
    APICheckViewSet,
    PromptPredictionViewSet,
    AttributeValuesViewSet,
    SongPredictionViewSet,
    SavedSongsViewSet,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("api-check", APICheckViewSet, basename="apicheck")
router.register("prompt", PromptPredictionViewSet, basename="promptprediction")
router.register("attributes", AttributeValuesViewSet, basename="attributevalues")
router.register("prediction", SongPredictionViewSet, basename="songprediction")
router.register("songs-saved", SavedSongsViewSet, basename="savedsongs")

urlpatterns = router.urls
