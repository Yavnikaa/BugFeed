from django.db import models
from bugfeed.models.users import Users
from bugfeed.models.projects import Projects

class Team(models.Model):
    project_name = models.ForeignKey(Projects, on_delete=models.CASCADE)
    project_members = models.ManyToManyField(Users, related_name="team_member_related",related_query_name="team_member")
    
