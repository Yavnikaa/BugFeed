from rest_framework import serializers
from bugfeed.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = [ 'enrol_number', 'degree_name' , 'branch_name']
        read_only_fields = ['full_name']




