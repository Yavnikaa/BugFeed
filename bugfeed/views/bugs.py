from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from bugfeed.serializers.bugs import BugsSerializer
from bugfeed.models.bugs import Project_bugs
from bugfeed.permissions import TeamPermissions


class BugsViewSet(viewsets.ModelViewSet):
    queryset = Project_bugs.objects.all()
    serializer_class = BugsSerializer
   # permission_classes= [IsAuthenticated&TeamPermissions]




