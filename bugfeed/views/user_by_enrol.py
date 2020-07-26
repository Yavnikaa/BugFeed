from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from bugfeed.permissions import ReadOnlyPermissions
from bugfeed.models.users import Users
from bugfeed.serializers.users import UserSerializer

class UserByEnrNoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = Users.objects.all()
    #permission_classes = [IsAuthenticated & ReadOnlyPermissions]
    authentication_classes = [TokenAuthentication, ]
    lookup_field = 'enrol_number'
