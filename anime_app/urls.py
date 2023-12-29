from django.urls import path
from .views import All_Anime, Create_anime, RemoveFromDB
urlpatterns = [
    path('all_anime/', All_Anime.as_view(), name="allanime"),
    path('create_anime/', Create_anime.as_view(), name="createanime"),
    path('delete/<int:anime_id>/', RemoveFromDB.as_view(), name="delete")

]
