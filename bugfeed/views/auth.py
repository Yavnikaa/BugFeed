import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.urls import reverse
from django.contrib.auth import login
from bugfeed.serializers.users import UserSerializer
from bugfeed.serializers.auth import AuthSerializer
import requests

class AuthView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, code, format=None):
        class Auth:
            def __init__(self, code):
                self.client_id = 'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5'
                self.client_secret = 'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw'
                self.grant_type = 'authorization_code'
                self.redirect_url = 'http://localhost:3000/auth/'
                self.code = code
        auth_object = Auth(code)
        serializer = AuthSerializer(auth_object)
        token_response = requests.post('https://internet.channeli.in/open_auth/token/', data=serializer.data)

        if token_response.status_code == 200:
            login_response = requests.post('http://localhost:8000'+reverse('knox_login'), data = token_response.json())

            if login_response.status_code == 200:
                login_response = login_response.json()
                user = User.objects.get(username =login_response['person']['fullName'])
                user_serializer = UserSerializer(user)
                user_data = {'token':login_response['token'], 'expiry':login_response['expiry'], 'user':user_serializer.data}
                return Response (user_data)

            return Response(login_response.json())

        return Response(token_response.json())
