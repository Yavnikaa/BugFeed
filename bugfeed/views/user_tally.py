from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from bugfeed.serializers.user_bugs import UsersBugsTallySerializer
from bugfeed.permissions import ReadOnlyPermissions
from bugfeed.models.users import Users

class UsersIssueTallyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UsersBugsTallySerializer
    queryset = Users.objects.all()
    permission_classes = [IsAuthenticated & ReadOnlyPermissions]
    authentication_classes = [TokenAuthentication, ]