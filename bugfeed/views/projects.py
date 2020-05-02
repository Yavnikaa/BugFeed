from rest_framework import permissions
from rest_framework import viewsets
from bugfeed.serializers.projects import ProjectSerializer
from bugfeed.models.projects import Projects
from bugfeed.permissions import IsOwnerOrReadOnly

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
                                           
