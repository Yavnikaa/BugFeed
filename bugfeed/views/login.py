from rest_framework.response import Response
from bugfeed.models.users import Users
from bugfeed.serializers.auth_token import AuthTokenSerializer
from django.contrib.auth import login
from rest_framework import permissions
from knox.views import LoginView as KnoxLoginView
from rest_framework.exceptions import ParseError, PermissionDenied
import requests

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        try:
            AUTH_TOKEN = 'Bearer '+request.data['access_token']
            headers = {'Authorization': AUTH_TOKEN}
            url = 'https://internet.channeli.in/open_auth/get_user_data/'
            data_response = requests.get(url, headers=headers)

            if data_response.status_code == 200:
                data_response = data_response.json()
                is_img_member = False
                roles_array = data_response['person']['roles']
                for role in roles_array:
                    if role['role'] == 'Maintainer':
                        is_img_member = True
                        break
                
                if is_img_member:
                    userId = (data_response['userId'])
                    name = (data_response['person']['fullName']).strip()
                    enrol_number = (data_response["student"]["enrolmentNumber"])
                    current_year = (data_response["student"]["currentYear"])
                    branch_name= (data_response["student"]["branch name"])
                    degree_name= (data_response["student"]["branch degree name"])
                    display_picture = (data_response["person"]["displayPicture"])
                    is_master = True
                    if data_response['student']['currentYear'] <= 3:
                        is_master = False
                    
                    try:
                        username = name[:name.index(' ')]+'_'+str(userId)
                    except ValueError:
                        username = name+'_'+str(userId)
                    
                    try:
                        requestUser = Users.objects.get(userId = userId)
                        serializer = AuthTokenSerializer(data={'userId': requestUser.userId})
                        serializer.is_valid(raise_exception=True)
                        user = serializer.validated_data['user']
                        login(request, user)
                        return super(LoginView, self).post(request, format=None)
                        

                    except Users.DoesNotExist:
                        requestUser = Users(
                            userId=userId,
                            name=name,
                            username=username,
                            enrol_number = enrol_number,
                            is_master = is_master,
                            current_year=current_year,
                            branch_name=branch_name,
                            degree_name=degree_name,
                            display_picture=display_picture
                            )
                        requestUser.save()
                        serializer = AuthTokenSerializer(data={'userId': requestUser.userId})
                        serializer.is_valid(raise_exception=True)
                        user = serializer.validated_data['user']
                        login(request, user)
                        return super(LoginView, self).post(request, format=None)
                    
                    else:
                        raise PermissionDenied

            else:
                return Response(data_response)
        except KeyError:
            raise ParseError
