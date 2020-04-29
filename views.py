from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from bugfeed.serializers import *
from bugfeed.models import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


# Create your views here.
