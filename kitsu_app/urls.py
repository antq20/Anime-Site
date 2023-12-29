from django.urls import path
from .views import KitsuAPI,KitsuAdventure,KitsuRomance,KitsuComedy,KitsuMecha,KitsuMystery,KitsuFantasy,KitsuSports

urlpatterns = [
    path('<str:anime_title>/', KitsuAPI.as_view(), name="kitsuapi"),
    path("adventure/<int:page_num>/", KitsuAdventure.as_view(), name="adventure"),
    path("romance/<int:page_num>/", KitsuRomance.as_view(),name="romance"),
    path("comedy/<int:page_num>/", KitsuComedy.as_view(),name="comedy"),
    path("mecha/<int:page_num>/",KitsuMecha.as_view(),name="mecha"),
    path("mystery/<int:page_num>/",KitsuMystery.as_view(),name="mystery"),
    path("fantasy/<int:page_num>/",KitsuFantasy.as_view(),name="fantasy"),
    path("sports/<int:page_num>/",KitsuSports.as_view(),name="sports"),

]