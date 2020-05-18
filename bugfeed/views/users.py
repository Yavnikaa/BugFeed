
from rest_framework import viewsets
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users
from bugfeed.permissions import MasterPermissions
from rest_framework.decorators import action
import requests
from django.contrib.auth import login, logout
from django.http import HttpResponse
from datetime import timedelta
from django.utils import timezone
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes =[MasterPermissions]


    @action(methods=['post', 'options', 'get',], detail=False, url_name='onlogin', url_path='onlogin')
    def on_login(self, request):
        code = self.request.query_params.get('code')
        print(code)

        #GETTING THE AUTHORISATION CODE
        url = 'https://internet.channeli.in/open_auth/token/'
        data = {
                'client_id':'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5',
                'client_secret':'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw',
                'grant_type':'authorization_code',
                'redirect_url':'http://127.0.0.1:8000/bugfeed/',
                'code': code
                } 
        user_data = requests.post(url=url, data=data).json()
        acs_token = user_data['access_token']
        refresh_token=user_data['refresh_token']
        expires_in = user_data['expires_in']
        print(acs_token)

        #GET ACCESS TOKEN
        headers={
                'Authorization':'Bearer ' + acs_token
                }
        user_data = requests.get(url='https://internet.channeli.in/open_auth/get_user_data/', headers=headers)
        return HttpResponse(user_data)

        #CHECK IF TOKEN EXPIRED
        def expires_in(acs_token):
            time_elapsed = timezone.now() - acs_token.created
            left_time = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
            return left_time

# token checker if token expired or not
        def is_token_expired(acs_token):
            return expires_in(acs_token) < timedelta(seconds = 0)

# if token is expired new token will be established
# If token is expired then it will be removed
        def token_expire_handler(acs_token):
            is_expired = is_token_expired(acs_token)
        if is_expired:
            acs_token.delete() 
            
        #GET ACCESS TOKEN FROM REFRESH TOKEN
        if is_expired:
            url = 'https://internet.channeli.in/open_auth/token/'
            data = {
                'client_id':'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5',
                'client_secret':'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw',
                'grant_type':'refresh_token',
                'refresh_token': refresh_token
                }
            user_data = requests.post(url=url, data=data).json()

        acs_token=user_data['access_token']
        refresh_token=user_data['refresh_token']

        headers={
                'Authorization':'Bearer ' + acs_token
                }
        user_data = requests.get(url='https://internet.channeli.in/open_auth/get_user_data/', headers=headers).json()




        #return HttpResponse(user_data)
        #CHECK IF USER EXISTS
        try:
            user = Users.objects.get(enrol_number=user_data['student']['enrolmentNumber'])
        except Users.DoesNotExist:
            # CHECK IF A PART OF IMG OR NOT
            is_img_member = False
            for role in user_data["person"]["roles"]:
                if role["roles"] == "Maintainer":
                    is_img_member = True
                    break
            if is_img_member:
                #CREATE USER
                enrol_number = user_data["student"]["enrolment_number"]
                email = user_data["contactInformation"]["instituteWebmailAddress"]
                first_name = user_data["person"]["short_name"]
                full_name = user_data["person"]["full_name"]
                current_year = user_data["student"]["current_year"]
                branch_name=user_data["student"]["branch"]["name"]
                degree_name=user_data["student"]["branch"]["degree"]["name"]
                display_picture = user_data["person"]["display_picture"]
                is_master = True
                if user_data['student']['current_year'] <= 3:
                    is_master = False

                newUser = Users(enrol_number = enrol_number,
                                email=email, 
                                first_name = first_name, 
                                full_name=full_name, 
                                is_master = is_master, 
                                access_token = acs_token, 
                                refresh_token=refresh_token,
                                current_year=current_year,
                                branch_name=branch_name,
                                degree_name=degree_name, 
                                display_picture=display_picture)
                newUser.is_staff = True
                newUser.is_admin = True
                newUser.save()

                return Response({'status': 'User Created', 'access_token': acs_token}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'status': 'User not a member of IMG'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request=request, user=user)
        return Response({'Status': 'User Exists', 'access_token': acs_token})
    @action(methods=['post', 'options', ], detail=False, url_name='login', url_path='login')
    def login(self, request):

        data = self.request.data
        token = data['access_token']

        try:
            user = Users.objects.get(access_token=token)
        except Users.DoesNotExist:
            return Response({'status': 'User does not exist in database'}, status=status.HTTP_403_FORBIDDEN)
        login(request=request, user=user)
        return Response({'status': 'User found'}, status=status.HTTP_202_ACCEPTED)


