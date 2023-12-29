from django.urls import path
from .views import NekoApi

urlpatterns = [
path("", NekoApi.as_view(), name="nekoapi"),
]