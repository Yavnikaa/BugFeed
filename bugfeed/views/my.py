from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from bugfeed.serializers.users import UserSerializer
from bugfeed.models.users import Users



class MyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, ]

    def get_queryset(self):
        return Users.objects.filter(id=self.request.user.id)