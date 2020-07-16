from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets,status
from rest_framework.response import Response
from bugfeed.serializers.comments import CommentsSerializer
from bugfeed.models.comments import Comments
from bugfeed.permissions import CommentPermissions, MasterPermissions

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()
    permission_classes = [IsAuthenticated & (CommentPermissions| MasterPermissions)]
    authentication_classes = [TokenAuthentication, ]

    def create(self, request, *args, **kwargs):
        comment = request.data
        comment['comment_by'] = request.user.id
        serializer = CommentsSerializer(data=comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







