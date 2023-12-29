from django.urls import path
from .views import AddToFavorites, FavoriteListView, RemoveFromFavorites
urlpatterns = [
    path('add_to_favorites/', AddToFavorites.as_view(), name="addtofavorites"),
    path('',FavoriteListView.as_view(), name='favorites'),
    path('remove_from_favorites/<int:anime_id>/', RemoveFromFavorites.as_view(), name="removefromfavorites")
]
