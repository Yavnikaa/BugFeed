from rest_framework import serializers
from bugfeed.models.users import Users 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        read_only_fields = ['enrol_number']
        exclude = ['access_token','refresh_token','password']




