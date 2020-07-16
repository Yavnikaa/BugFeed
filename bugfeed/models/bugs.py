from django.db import models
from djrichtextfield.models import RichTextField
from bugfeed.models.projects import Projects
from bugfeed.models.teams import Team
from bugfeed.models.tags import Tags
from django.conf import settings

class Project_bugs(models.Model):
    StatusValues = models.TextChoices('StatusValues', 'PENDING RESOLVED TO_BE_DISCUSSED')
    
    bug_heading=models.CharField(max_length=30)
    bug_description=RichTextField(blank=True)
    category=models.ManyToManyField(Tags)
    other_text=models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=25, choices=StatusValues.choices, default='RESOLVED')
    assigned_to = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True,)
    reported_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='issue_creator', on_delete=models.CASCADE)
    project_bug = models.ForeignKey(Projects, on_delete=models.CASCADE)
    timestamp =models.DateTimeField()
    

    class Meta:
        ordering=['timestamp']


    def sortby_status(self):
        return Project_bugs.objects.order_by('status')



    


    


