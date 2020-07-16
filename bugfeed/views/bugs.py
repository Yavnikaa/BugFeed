from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets,status
from rest_framework.response import Response
from bugfeed.serializers.bugs import BugsSerializer
from bugfeed.models.bugs import Project_bugs
from bugfeed.permissions import TeamPermissions,IssueCreationPermissions,IssueEditPermissions


class BugsViewSet(viewsets.ModelViewSet):
    queryset = Project_bugs.objects.all()
    serializer_class = BugsSerializer
   #permission_classes= [IsAuthenticated&(TeamPermissions|IssueCreationPermissions|IssueEditPermissions]
    authentication_classes = [TokenAuthentication, ]
    
    def create(self, request, *args, **kwargs):
        issue = request.data
        issue['reported_by'] = request.user.id
        serializer = BugsSerializer(data=issue)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





