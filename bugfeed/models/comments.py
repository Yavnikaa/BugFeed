from django.db import models
from bugfeed.models.bugs import Project_bugs
from bugfeed.models.users import Users
from django.conf import settings

class Comments(models.Model):
    bug_comment=models.ForeignKey(Project_bugs, on_delete=models.CASCADE)
    comment_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment_text = models.TextField() 
    comment_time = models.DateTimeField()

