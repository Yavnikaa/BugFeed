from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from bugfeed.serializers.project_slug import ProjectNameSlugSerializer
from bugfeed.models.projects import Projects
from bugfeed.permissions import ReadOnlyPermissions


class ProjectNameSlugViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectNameSlugSerializer
    queryset = Projects.objects.all()    
    permission_classes = [IsAuthenticated & ReadOnlyPermissions]
    authentication_classes = [TokenAuthentication, ]