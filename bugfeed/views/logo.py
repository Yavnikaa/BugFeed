from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from bugfeed.serializers.logo import LogoSerializer
from bugfeed.models.logo import Logo_ideas
from bugfeed.permissions import LogoPermissions

class LogoViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class= LogoSerializer
    #queryset = Logo_ideas.objects_with_scores.all()
    #permission_classes = [IsAuthenticated & LogoPermissions]
    authentication_classes = [TokenAuthentication, ]
