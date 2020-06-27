from rest_framework import viewsets
from bugfeed.models.users import Users
from bugfeed.serializers.users import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

class MyViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     queryset = 
    #     return queryset
    def get_object(self):
        return self.request.user
