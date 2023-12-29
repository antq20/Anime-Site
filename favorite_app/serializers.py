from rest_framework import serializers
from .models import Favorite_list
from anime_app.serializers import AnimeSerializer
class FavoriteListSerializer(serializers.ModelSerializer):
    anime_information= AnimeSerializer(source='anime',read_only=True)

    class Meta:
        model = Favorite_list
        fields = ['id','anime','user','anime_information']