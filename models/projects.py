from django.db import models
from djrichtextfield.models import RichTextField
from bugfeed.models.users import Users

class Projects(models.Model):
    PriorityValues = models.TextChoices('PriorityValues', 'HIGH MODERATE LOW RELEASED')

    project_name = models.CharField(max_length=35)
    project_wiki = RichTextField()
    project_date = models.DateTimeField()
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    project_link = models.URLField(default='')
    priority_value = models.CharField(max_length=10, choices=PriorityValues.choices, default='MODERATE')



    class Meta:
        ordering = ['project_date']




