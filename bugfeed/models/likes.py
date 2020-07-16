from django.db import models
from bugfeed.models.users import Users
from bugfeed.models.bugs import Project_bugs
from django.conf import settings

class Likes(models.Model):
    liked_by=models.ManyToManyField(settings.AUTH_USER_MODEL)
    bug_like = models.ForeignKey(Project_bugs, on_delete=models.CASCADE)
