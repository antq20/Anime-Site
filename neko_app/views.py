from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
)
import requests



class NekoApi(APIView):
    def get(self, request):
        base_url = "https://api.nekosapi.com/v3/images/random?rating=safe"

        response = requests.get(base_url)

        if response.status_code == 200:
            try:
                response_json = response.json()
                return Response(response_json)
            except requests.exceptions.JSONDecodeError:
                return Response({"error": "Invalid JSON in response"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": f"Failed to fetch data. Status code: {response.status_code}"}, status=response.status_code)