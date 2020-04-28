from django.db import models
from djrichtextfield.models import RichTextField
from bugfeed.models.priority import Priority
from bugfeed.models.users import Users

class Projects(models.Model):
    project_name = models.CharField(max_length=35)
    project_wiki = RichTextField()
    project_date = models.DateTimeField()
    priority = models.ForeignKey(Priority, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    project_link = models.URLField(default='')

    class Meta:
        ordering = ['project_date']




