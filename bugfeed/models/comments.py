from django.db import models
from bugfeed.models.bugs import Project_bugs
from bugfeed.models.users import Users

class Comments(models.Model):
    bug_comment=models.ForeignKey(Project_bugs, on_delete=models.CASCADE)
    comment_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment_text = models.TextField() 
    comment_time = models.DateTimeField()

