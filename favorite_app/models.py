from django.db import models
from django.contrib.auth.models import AbstractUser
from user_app.models import User
from anime_app.models import Anime

class Favorite_list(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    anime= models.ForeignKey(Anime, on_delete=models.CASCADE,default=None)
