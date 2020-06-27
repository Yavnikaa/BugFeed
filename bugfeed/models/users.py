from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,username, userId ,password=None):
        if not username:
            raise ValueError("User must have a username")
        if not userId:
            raise ValueError("User must have a userId")

        user=self.model(username=username, userId=userId)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Users(AbstractUser):
    first_name = None
    last_name = None
    password = models.CharField(max_length=80, default=None)
    display_picture= models.ImageField(upload_to='assignment/media/', null=True)
    userId = models.BigIntegerField(unique = True)
    name = models.CharField(max_length = 180)
    is_master = models.BooleanField(default=True)
    enrol_number = models.IntegerField(unique=True)
    branch_name = models.CharField(max_length=80)
    current_year = models.PositiveSmallIntegerField()
    degree_name = models.CharField(max_length=80)
    is_active = models.BooleanField(default=True)

    objects = UserManager()
    
    USERNAME_FIELD = 'userId'
    #PASSWORD_FIELD = 'enrol_number'

   #required_fields = ['name', 'username']

    def __str__(self):
        return self.name
    
    
    @property
    def user_description(self):
        "Returns the user description."
        return '%s %s , %s year' % (self.degree_name, self.branch_name, self.current_year)
