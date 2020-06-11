
from rest_framework import viewsets
from rest_framework import status
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
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
   #permission_classes =[MasterPermissions]


    @action(methods=['post', 'options', 'get',], detail=False, url_name='onlogin', url_path='onlogin')
    def on_login(self, request):
        code = self.request.GET.get('code')
        print(code)

        #GETTING THE AUTHORISATION CODE
        url = 'https://internet.channeli.in/open_auth/token/'
        data = {
                'client_id':'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5',
                'client_secret':'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw',
                'grant_type':'authorization_code',
                'redirect_url':'http://127.0.0.1:8000/bugfeed/users/onlogin/',
                'code': code
                }
            
        auth_data = requests.post(url=url, data=data).json()
        #print(auth_data)

        acs_token = auth_data["access_token"]
        refresh_token= auth_data["refresh_token"]
        expires_in = auth_data["expires_in"]
        print(acs_token)

        #GET ACCESS TOKEN
        headers={
                'Authorization':'Bearer ' + acs_token
                }
        user_data = requests.get(url='https://internet.channeli.in/open_auth/get_user_data/', headers=headers)
       # return HttpResponse(user_data)

        #CHECK IF TOKEN EXPIRED
        #def expires_in(acs_token):
            #time_elapsed = timezone.now() - acs_token.created
            #left_time = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
            #return left_time

# token checker if token expired or not
        #def is_token_expired(acs_token):
            #if (expires_in(acs_token) < timedelta(seconds = 0)):
                #return true
            #else:
                #return false

# if token is expired new token will be established
# If token is expired then it will be removed
        #if (is_token_expired(acs_token)):
            #acs_token.delete() 
            
        #GET ACCESS TOKEN FROM REFRESH TOKEN
        #if (is_token_expired(acs_token)):
            #url = 'https://internet.channeli.in/open_auth/token/'
            #data = {
              #  'client_id':'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5',
               # 'client_secret':'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw',
                #'grant_type':'refresh_token',
                #'refresh_token': refresh_token
               # }
            #auth_data = requests.post(url=url, data=data).json()

        #acs_token=auth_data['access_token']
        #refresh_token= auth_data['refresh_token']

        #headers={
               # 'Authorization':'Bearer ' + acs_token
                #}
        #user_data = requests.get(url='https://internet.channeli.in/open_auth/get_user_data/', headers=headers).json()




       #return HttpResponse(user_data)

        #CHECK IF USER EXISTS

        print(user_data.json())
        try:
            user_data = user_data.json()
            user = Users.objects.get(enrol_number=user_data['student']['enrolmentNumber'])
        
        except Users.DoesNotExist:
            # CHECK IF A PART OF IMG OR NOT
            is_img_member = False
            for role in user_data["person"]["roles"]:
                if role["role"] == "Maintainer":
                    is_img_member = True
                    break
            if is_img_member:
                #CREATE USER
                enrol_number = user_data["student"]["enrolmentNumber"]
                first_name = user_data["person"]["shortName"]
                full_name = user_data["person"]["fullName"]
                current_year = user_data["student"]["currentYear"]
                branch_name=user_data["student"]["branch name"]
                degree_name=user_data["student"]["branch degree name"]
                display_picture = user_data["person"]["displayPicture"]
                is_master = True
                if user_data['student']['currentYear'] <= 3:
                    is_master = False

                newUser = Users(enrol_number = enrol_number,
                                first_name = first_name, 
                                username=full_name, 
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
            
        user.access_token = acs_token
        user.save()
        return Response({'Status': 'User Exists', 'access_token': acs_token})
    
    @action(methods = ['get',], detail=False, url_path='current_user', url_name='current_user')
    def get_current_user_data(self, request):
        user = request.user
        if not(user.username == ''):
            return Response({'Response':'Logged In'})
        else:
            return Response({'Response':'No Current User'})

