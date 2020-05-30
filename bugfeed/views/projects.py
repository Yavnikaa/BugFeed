from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,status
from rest_framework.response import Response
from bugfeed.serializers.projects import ProjectSerializer
from bugfeed.models.projects import Projects
from bugfeed.models.teams import Team
from bugfeed.permissions import IsOwnerOrReadOnly

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated&IsOwnerOrReadOnly]

    def post(self, request , project_members):
        projects = self.request.POST.pop('projects')
        teams = self.request.POST.pop('teams')
        
        try:
            required_data = self.request.POST[data]
            projects_id = 0
            for project in projects:
                project_name = required_data.pop('project_name')
                project_date = required_data.pop('project_date')
                created_by = required_data.pop('created_by')
                project_link = required_data.pop('project_link')
                project_wiki = required_data.pop('project_wiki')
                updated_date = required_data.pop('updated_date')
                priority_value = required_data.pop('priority_value')

                Projects.objects.create(
                        project_name=project_name,
                        project_date=project_date,
                        created_by=created_by,
                        project_link=project_link,
                        project_wiki=project_wiki,
                        updated_date=updated_date,
                        priority_value=priority_value)
                
                projects_id +=1


            team_id=0
            for team in teams:
                team_project_name = Projects('project_name')
                project_members = required_data.pop('project_members')
                
                Team.objects.create(
                    project_name=team_project_name,
                    project_members=project_members)
                
                team_id+=1
                
                return Response(
                'Project and Team successfully created' , status=status.HTTP_201_CREATED,
                )
        
        except Exception as error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)



            
            
            

