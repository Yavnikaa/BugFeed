from rest_framework import serializers
from bugfeed.serializers.bugs import BugsSerializer
from bugfeed.models.users import Users

class UsersBugsTallySerializer(serializers.ModelSerializer):
    issues = BugsSerializer(source='issue_creator', many=True, read_only=True)

    class Meta:
        model = Users
        fields = ('id','enrol_number', 'name','issues')
