from django.contrib.auth.models import User
from django.db import models

class Users(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=40)
    display_picture = models.ImageField(upload_to='assignment/media/', null=True)
    is_master = models.BooleanField(default=True)
    enrol_number = models.IntegerField(unique=True)
    branch_name = models.CharField(max_length=80)
    current_year = models.PositiveSmallIntegerField()
    degree_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    access_token = models.CharField(max_length=100, default='', blank=True)
    refresh_token = models.CharField(max_length=100, default='', blank=True)

    @property
    def user_description(self):
        "Returns the user description."
        return '%s %s , %s year' % (self.degree_name, self.branch_name, self.current_year)
