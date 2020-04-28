from django.contrib.auth.models import User
from django.db import models

class Users(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=30)
    display_picture = models.ImageField(upload_to='assignment/media/', null=True)
    is_master = models.BooleanField(default=False)
    enrol_number = models.IntegerField(unique=True)
    branch_name = models.CharField(max_length=80)
    current_year = models.PositiveSmallIntegerField()
    degree_name = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

