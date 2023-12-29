from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Favorite_list, Anime
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK
from .serializers import FavoriteListSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class AddToFavorites(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
                
                animeData=request.data['anime']
                user= request.user
                animeID= int(animeData['id'])
                anime, created= Anime.objects.get_or_create(id=animeID, 
                name=animeData['attributes']['canonicalTitle'],    
                description=animeData['attributes']['description'],
                rating=animeData['attributes']['averageRating'],
                genre=animeData['attributes']['ageRatingGuide'],
                img=animeData['attributes']['posterImage']['original']
                )

                if created:
                    anime = Anime.objects.get(id=animeID)
                if Favorite_list.objects.filter(user=user, anime=anime).exists():
                    return Response({'message': 'Anime is already in favorites'}, status=HTTP_400_BAD_REQUEST)
                
                favorite = Favorite_list.objects.create(user=user, anime=anime)
                return Response(True, status=HTTP_201_CREATED)

           
    
class FavoriteListView(APIView):
    def get(self, request):
        user = request.user
        favorites = Favorite_list.objects.filter(user=user)
        serializer = FavoriteListSerializer(favorites, many=True)  
        return Response(serializer.data, status=HTTP_200_OK)

class RemoveFromFavorites(APIView):
     def delete(self,request,anime_id):
          user=request.user
          anime= get_object_or_404(Anime, id=anime_id)
          favorite= get_object_or_404(Favorite_list, user=user,anime=anime)
          favorite.delete()
          return Response({"message": "Anime removed from favorites"}, status=HTTP_200_OK)