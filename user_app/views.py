from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
import logging
from django.shortcuts import get_object_or_404


class Sign_up(APIView):
    def post(self, request):
    
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user=User.objects.create_user(**request.data)
            token= Token.objects.create(user=user)
            return Response({"user":user.username,"token":token.key}, status= HTTP_201_CREATED)
        else:
            return Response({"message":"Ensure this email is not already in use. Usernames must contain only letters and numbers."}, status=HTTP_400_BAD_REQUEST)
        
class Log_In(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        logging.debug("username")

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.username}, status=HTTP_200_OK)
        else:
            return Response(True, status=HTTP_400_BAD_REQUEST)
        
      
class UserPermissions(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user= UserSerializer(request.user)
        return Response(user.data)
    

class Log_out(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class UpdateInfo(APIView):
    def put(self, request, id):
        user = get_object_or_404(User, id=id)
        newUser= UserSerializer(user, data=request.data, partial=True)
        print(request.data)
        if newUser.is_valid():
            newUser.save()
            return Response(status=HTTP_204_NO_CONTENT)
        else:
            return Response(newUser.errors, status=HTTP_400_BAD_REQUEST)
