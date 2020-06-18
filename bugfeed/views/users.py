
from rest_framework import viewsets
from rest_framework import status
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users
from bugfeed.serializers.teams import TeamSerializer
from bugfeed.models.teams import Team
from bugfeed.serializers.bugs import BugsSerializer
from bugfeed.models.bugs import Project_bugs
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
    
    
    @action(methods = ['get',], detail=False, url_path='current_user', url_name='current_user')
    def get_current_user_data(self, request):
        user = request.user
        if not(user.username == ''):
            return Response({'Response':'Logged In'})
        else:
            return Response({'Response':'No Current User'})

    @action(methods = ['post', 'options', 'get'], detail=False, url_path='user_page', url_name='user_page')
    def get_user_page(self, request):
        user = request.user
        serializer = UserSerializer(user)
        user_projects = Team.objects.filter(project_members=user.pk)
        serializer2 = TeamSerializer(user_projects, many=True)
        user_assigned_issues = Project_bugs.objects.filter(assigned_to=user.pk)
        serializer3 = BugsSerializer(user_assigned_issues, many=True)
        user_reported_issues = Project_bugs.objects.filter(reported_by=user.pk)
        serializer4 = BugsSerializer(user_reported_issues, many=True)
        return Response({'user_data': serializer.data,
                         'projects': serializer2.data,
                         'assigned_issues': serializer3.data,
                         'reported_issues': serializer4.data})
