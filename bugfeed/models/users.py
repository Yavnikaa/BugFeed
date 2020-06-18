from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    first_name = None
    last_name = None
    password = None
    display_picture= models.ImageField(upload_to='assignment/media/', null=True)
    #userId = models.BigIntegerField(unique = True)
    is_master = models.BooleanField(default=True)
    enrol_number = models.IntegerField(unique=True)
    branch_name = models.CharField(max_length=80)
    current_year = models.PositiveSmallIntegerField()
    degree_name = models.CharField(max_length=80)
    is_active = models.BooleanField(default=True)
    
    
    @property
    def user_description(self):
        "Returns the user description."
        return '%s %s , %s year' % (self.degree_name, self.branch_name, self.current_year)
