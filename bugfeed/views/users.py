
from rest_framework import viewsets
from rest_framework import status
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users
from bugfeed.serializers.teams import TeamSerializer
from bugfeed.models.teams import Team
from bugfeed.serializers.bugs import BugsSerializer
from bugfeed.models.bugs import Project_bugs
from bugfeed.permissions import MasterPermissions
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
   #permission_classes =[MasterPermissions]
    
    
    @login_required
    def get_current_user_data(self, request):
        user = request.user
        if not(user.name == ''):
            return Response({'Response':'Logged In'})
        else:
            return Response({'Response':'No Current User'})

   # @action(methods = ['post', 'options', 'get'], detail=False, url_path='user_page', url_name='user_page')
    #def get_user_page(self, request):
     #   user = request.user
      #  serializer = UserSerializer(user)
       # user_projects = Team.objects.filter(project_members=user.pk)
        #serializer2 = TeamSerializer(user_projects, many=True)
      #  user_assigned_issues = Project_bugs.objects.filter(assigned_to=user.pk)
     #   serializer3 = BugsSerializer(user_assigned_issues, many=True)
    #    user_reported_issues = Project_bugs.objects.filter(reported_by=user.pk)
   #     serializer4 = BugsSerializer(user_reported_issues, many=True)
   #     return Response({'user_data': serializer.data,
    #                     'projects': serializer2.data,
    #                     'assigned_issues': serializer3.data,
     #                    'reported_issues': serializer4.data})
