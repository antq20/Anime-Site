from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
import re
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

class User(AbstractUser):
    username = models.CharField(
        blank=False,
        null=False,
        unique=True, 
        max_length=12,
        validators=[RegexValidator(r'^[\w]+$', "Invalid format")]
        )
    email=models.CharField(blank=False,null= False,unique=True, max_length=255)
    profileImg=models.CharField(blank=True, default="https://w0.peakpx.com/wallpaper/784/45/HD-wallpaper-satoru-gojo-gambar-gambar-anime-funny-gojo-thumbnail.jpg", null=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS= []

