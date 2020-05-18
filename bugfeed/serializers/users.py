from rest_framework import serializers
from bugfeed.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = [ 'degree_name' , 'branch_name', 'access_token','refresh_token']
        read_only_fields = ['full_name','enrol_number']




