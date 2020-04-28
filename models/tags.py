from django.db import models

class Tags(models.Model):
    TagValues = models.TextChoices('TagValues', 'ENHANCEMENT BUG UI/UX DUPLICATE')

    value = models.CharField(max_length=20, choices=TagValues.choices, default='BUG')




