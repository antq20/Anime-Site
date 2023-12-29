from django.urls import path
from .views import YoutubeAPI

urlpatterns = [
    path('<str:anime_title>/', YoutubeAPI.as_view(), name="youtube"),

]