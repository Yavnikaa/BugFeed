from rest_framework import permissions
from rest_framework import viewsets
from bugfeed.serializers.comments import CommentsSerializer
from bugfeed.models.comments import Comments



class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    #permission_classes=[permissions.IsAuthenticated]






