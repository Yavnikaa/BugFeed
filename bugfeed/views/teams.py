from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from bugfeed.serializers.teams import TeamSerializer
from bugfeed.models.teams import Team
from bugfeed.permissions import MasterPermissions

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes=[IsAuthenticated&MasterPermissions]






