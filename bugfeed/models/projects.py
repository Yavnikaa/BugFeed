from django.db import models
from django import forms
from djrichtextfield.models import RichTextField
from bugfeed.models.users import Users
from django.conf import settings
import datetime

class Projects(models.Model):
    PriorityValues = models.TextChoices('PriorityValues', 'HIGH MODERATE LOW RELEASED')

    project_name = models.CharField(max_length=35)
    project_wiki = RichTextField()
    project_date = models.DateTimeField(editable=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="owner",editable=False)
    project_link = models.URLField(default='')
    priority_value = models.CharField(max_length=10, choices=PriorityValues.choices, default='MODERATE')
    updated_date = models.DateTimeField(editable=False, null=True)
    

    def save(self):
        if not self.id:
            self.project_date = datetime.date.today()
        self.updated_date = datetime.datetime.today()
        super(Projects,self).save()

    def save_model(self,request,obj):
        obj.created_by  = request.user
        obj.save()



    class Meta:
        ordering = ['project_date']




