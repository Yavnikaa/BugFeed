from rest_framework import permissions
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from bugfeed.serializers import *
from bugfeed.models import *
from bugfeed.permissions import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes =[permissions.IsAuthenticated,MasterPermissions]

class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    permission_classes=[permissions.IsAuthenticated]

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes=[permissions.IsAuthenticated, MasterPermissions]





# Create your views here.
