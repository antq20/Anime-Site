from rest_framework.views import APIView
from rest_framework.response import Response
from requests_oauthlib import OAuth1 
from anime_project.settings import env
import requests


class KitsuAPI(APIView):
    def get(self, request, anime_title):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = "https://kitsu.io/api/edge/anime"
        filter_param = f"?filter[text]={anime_title}"
        endpoint = f"{base_url}{filter_param}"

        response = requests.get(endpoint, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)
    
class KitsuAdventure(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=adventure&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)

class KitsuRomance(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=romance&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)
    
class KitsuComedy(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=comedy&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)
    
class KitsuMecha(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=mecha&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)

    
class KitsuMystery(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=mystery&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)

class KitsuFantasy(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=fantasy&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)


class KitsuSports(APIView):
     def get(self, request, page_num):
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))
        base_url = f"https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=sports&page%5Boffset%5D={page_num}&page%5Blimit%5D=5"

        response = requests.get(base_url, auth=auth)  
        response_json = response.json()
        print(response_json)
        return Response(response_json)
