from rest_framework import serializers
from bugfeed.models.bugs import Project_bugs

class BugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_bugs
        exclude = ['bug_description']
        read_only_fields = ['bug_heading','timestamp']




