from django.db import models
from bugfeed.models.users import Users
from bugfeed.models.projects import Projects
from django.conf import settings

class Team(models.Model):
    project_name = models.ForeignKey(Projects, on_delete=models.CASCADE)
    project_members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="team_member_related",related_query_name="team_member")
    
