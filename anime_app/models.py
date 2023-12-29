from django.db import models

class Anime(models.Model):
    name= models.CharField(max_length=255,default=None)
    description= models.CharField(max_length=(10000))
    rating = models.DecimalField(max_digits=4, decimal_places=2 ,default=None)
    genre= models.CharField(max_length=500)
    img= models.CharField(max_length=10000, default=None,blank=True,null=True)
