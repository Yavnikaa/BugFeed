from django.db import models
from bugfeed.models.users import Users
from bugfeed.models.bugs import Project_bugs

class Likes(models.Model):
    liked_by=models.ManyToManyField(Users)
    likes_count=models.PositiveSmallIntegerField()
    bug_like = models.ForeignKey(Project_bugs, on_delete=models.CASCADE)
