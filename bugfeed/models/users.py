from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    display_picture = models.ImageField(upload_to='assignment/media/', null=True)
    is_master = models.BooleanField(default=True)
    enrol_number = models.IntegerField(unique=True)
    branch_name = models.CharField(max_length=80)
    current_year = models.PositiveSmallIntegerField()
    degree_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    access_token = models.CharField(max_length=100, default='', blank=True)
    refresh_token = models.CharField(max_length=100, default='', blank=True)

    def __str__(self):
        return self.get_username()

    def save_model(self):
        self.password = None
        super(Users,self).save()




    @property
    def user_description(self):
        "Returns the user description."
        return '%s %s , %s year' % (self.degree_name, self.branch_name, self.current_year)
