from .views import APICheckViewSet, InitialPredictionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("api-check", APICheckViewSet, basename="apicheck")
router.register(
    "initial-prediction", InitialPredictionViewSet, basename="initialprediction"
)

urlpatterns = router.urls
