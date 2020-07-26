from django.db import models
from djrichtextfield.models import RichTextField
from bugfeed.models.projects import Projects
from bugfeed.models.teams import Team
from bugfeed.models.tags import Tags
from bugfeed.models.users import Users
import datetime

class Project_bugs(models.Model):
    StatusValues = models.TextChoices('StatusValues', 'PENDING RESOLVED TO_BE_DISCUSSED')
    
    bug_heading=models.CharField(max_length=30)
    bug_description=RichTextField(blank=True)
    category=models.ManyToManyField(Tags)
    other_text=models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=25, choices=StatusValues.choices, default='PENDING')
    assigned_to = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True,)
    reported_by = models.ForeignKey(Users, related_name='issue_creator', on_delete=models.CASCADE , null=True,)
    #null=True for debugging purposes
    project_bug = models.ForeignKey(Projects, on_delete=models.CASCADE)
    timestamp =models.DateField(editable=False)
    
    def save(self,*args, **kwargs):
        if not self.id:
            self.timestamp = datetime.date.today()
        super(Project_bugs,self).save(*args, **kwargs)

    def save_model(self,request,obj,*args, **kwargs):
        obj.reported_by  = request.user.id
        obj.save(*args,**kwargs)

    class Meta:
        ordering=['timestamp']


    def sortby_status(self):
        return Project_bugs.objects.order_by('status')



    


    


