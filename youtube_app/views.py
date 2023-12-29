from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from requests_oauthlib import OAuth1 
from anime_project.settings import env
import requests
from googleapiclient.discovery import build


class YoutubeAPI(APIView):
    def get(self, request, anime_title):
        auth = env.get("YTAPI_KEY")
        youtube= build('youtube', 'v3', developerKey=auth)

        request= youtube.search().list(
            order="viewCount",
            q=f"{anime_title} Trailer",
            part= "id,snippet",
            maxResults=1
        )

        response = request.execute()
        print(response)
        return Response(response)