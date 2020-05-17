from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users
from bugfeed.permissions import MasterPermissions

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes =[IsAuthenticated&MasterPermissions]




