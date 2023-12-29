from django.shortcuts import render
from django.shortcuts import get_object_or_404
from anime_app.models import Anime
from .serializers import AnimeSerializer
from rest_framework.views import APIView
from user_app.views import UserPermissions
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST,HTTP_204_NO_CONTENT,HTTP_200_OK


class All_Anime(APIView):
    def get(self, request):
        anime=Anime.objects.all()
        serializer= AnimeSerializer(anime, many=True)
        return Response(serializer.data)

class Create_anime(APIView):
    def post(self, request):
        serializer=AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)


class RemoveFromDB(APIView):
     def delete(self,request,anime_id):
          anime= get_object_or_404(Anime, id=anime_id)
          anime.delete()
          return Response({"message": "Anime removed"}, status=HTTP_200_OK)