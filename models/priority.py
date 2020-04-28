from django.db import models

class Priority(models.Model):
    PriorityValues = models.TextChoices('PriorityValues', 'HIGH MODERATE LOW RELEASED')

    value = models.CharField(max_length=10, choices=PriorityValues.choices, default='MODERATE')
                                                                          
