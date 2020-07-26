from django.db import models
from django import forms
from djrichtextfield.models import RichTextField
from bugfeed.models.users import Users
import datetime

class Projects(models.Model):
    PriorityValues = models.TextChoices('PriorityValues', 'HIGH MODERATE LOW RELEASED')

    project_name = models.CharField(max_length=35)
    project_wiki = RichTextField()
    project_date = models.DateField(editable=False)
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="created_by",editable=False, null=True)
    project_link = models.URLField(default='')
    priority_value = models.CharField(max_length=10, choices=PriorityValues.choices, default='MODERATE')

    

    def save(self,*args, **kwargs):
        if not self.id:
            self.project_date = datetime.date.today()
        super(Projects,self).save(*args, **kwargs)

    def save_model(self,request,obj,*args, **kwargs):
        obj.created_by  = request.user.id
        obj.save(*args,**kwargs)



    class Meta:
        ordering = ['project_date']




