from rest_framework import viewsets,status
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from bugfeed.models.users import Users
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import make_password
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users
import requests

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Users.objects.all()
    authentication_classes=(CsrfExemptSessionAuthentication, BasicAuthentication)

@action(methods=['POST','OPTIONS,PUT'],detail=False,url_name='onlogin', url_path='onlogin', permission_classes=[AllowAny])
def onlogin(self,request):
    client_id = 'h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5'
    client_secret = 'T1y57ZPENADJ4dQZgSIuhNoGNeIkjzXCmyyn4Pbuw1Va0jl09tVjSB9ZcYtnfq2BUdvqhHkiodKt5VI93fInszV0fx5k1R3wJhIAOaDrtI2h4k97Oo0HSC37d5U45gBw'
    authorization_code = self.request.data['code']
    url = 'https://internet.channeli.in/open_auth/token/'
    data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'authorization_code',
            'redirect_url': 'http://127.0.0.1:3000/onlogin',
            'code': authorization_code}

    token_data = requests.post(url=url, data=data).json()
    if ('error' in  token_data.keys()):
         return Response(
             data = token_data['error'], 
             status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    access_token = token_data['access_token']
    refresh_token = token_data['refresh_token']
    headers = {
            'Authorization': 'Bearer ' + access_token
        }
    user_data = requests.get(url='https://internet.channeli.in/open_auth/get_user_data/', headers=headers).json()
    print(user_data)


    try: 
         existingUser = Users.objects.get(enrol_number=user_data['student']['enrolmentNumber'])
         print(existingUser)

    except Users.DoesNotExist:
            in_img = False
            for role in user_data['person']['roles']:
                if 'Maintainer' in role.values():
                    in_img = True

            
            if not in_img:
                return Response(
                    data = 'This app is only accessible to members of IMG IIT Roorkee.',
                    status = status.HTTP_401_UNAUTHORIZED
                )

            else:
                userId = (user_data['userId'])
                name = (user_data['person']['fullName']).strip()
                enrol_number = (user_data["student"]["enrolmentNumber"])
                current_year = (user_data["student"]["currentYear"])
                branch_name= (user_data["student"]["branch name"])
                degree_name= (user_data["student"]["branch degree name"])
                if user_data['person']['displayPicture'] != None:
                    display_picture = 'http://internet.channeli.in' + user_data['person']['displayPicture']
                else: 
                    display_picture = ''
                is_master = True
                if user_data['student']['currentYear'] <= 3:
                    is_master = False
                    
                newUser = Users(
                    username = enrol_number,
                    enrol_number = enrol_number,
                    name = name,
                    userId=userId,
                    is_master = is_master,
                    access_token = access_token,
                    refresh_token = refresh_token,
                    current_year = current_year,
                    branch_name = branch_name,
                    degree_name = degree_name,
                    is_active = True,
                    display_picture = display_picture,
                    password = make_password(access_token)
                )


                newUser.is_staff = True
                newUser.is_admin = True
                newUser.save()
                login(request=request, user=newUser)
                return Response(
                    {'status': 'Acount created successfully. Welcome to bugfeed.', 'username': enrol_number, 'access_token': access_token},
                    status = status.HTTP_202_ACCEPTED
                )

    current_year = user_data['student']['currentYear']
    branch_name = user_data['student']['branch name']
    degree_name = user_data['student']['branch degree name']
    if user_data['person']['displayPicture'] != None:
        display_picture = 'http://internet.channeli.in' + user_data['person']['displayPicture']
    else: 
        display_picture = ''
    is_master = True
    if user_data['student']['currentYear'] <= 3:
        is_master = False

    existingUser.is_master = is_master
    existingUser.current_year = current_year
    existingUser.branch = branch_name
    existingUser.degree = degree_name
    existingUser.display_picture = display_picture
        
    if existingUser.access_token != access_token:
        existingUser.access_token = access_token
        existingUser.refresh_token = refresh_token
        existingUser.set_password(access_token)
        existingUser.save()

    login(request=request, user=existingUser)

    return Response(
        {'status': 'Logged in! Welcome to BugFeed!', 'username': existingUser.enrol_number, 'access_token': access_token},
         status = status.HTTP_202_ACCEPTED
        )


    









