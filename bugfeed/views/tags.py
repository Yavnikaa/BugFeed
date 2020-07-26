from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from bugfeed.permissions import MasterPermissions
from bugfeed.models.tags import Tags
from bugfeed.serializers.tags import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tags.objects.all()
    #permission_classes = [IsAuthenticated & MasterPermissions]
    authentication_classes = [TokenAuthentication, ]
