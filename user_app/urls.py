from django.urls import path
from .views import Sign_up ,Log_In,Info,Log_out,UpdateInfo
urlpatterns = [
    path('signup/', Sign_up.as_view(), name="signup"),
    path('login/', Log_In.as_view(), name="login"),
    path('info/', Info.as_view(),name="info"),
    path('logout/',Log_out.as_view(),name="logout"),
    path('updateinfo/<int:id>/',UpdateInfo.as_view(),name="updateinfo"),


]
