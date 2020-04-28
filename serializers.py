from rest_framework import serializers
from bugfeed.models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        exclude = ['project_wiki']
        read_only_fields = ['project_date']

    def create(self, serializer_url_field):
        project = Projects(
                project_link = serializers.HyperLinkedIdentityField['project_link']
        )
        project.save()
        return project


class PrioritySerializer(serializers.ModelSerializer):
    value = serializers.ChoiceField['value']
    class Meta:
        model = Priority
    
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = ['is_active', 'display_picture']
        read_only_fields = ['full_name', 'enrol_number', 'degree_name' , 'branch_name']

class BugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_bugs
        exclude = ['bug_description']
        read_only_fields = ['bug_heading','timestamp']

class StatusSerializer(serializers.ModelSerializer):
    value = serializers.ChoiceField['value']
    class Meta:
        model = Status

class TagSerializer(serializers.ModelSerializer):
    value = serializers.ChoiceField['value']
    class Meta:
        model = Tags

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '_all_'
        read_only_fields = ['comment_by', 'comment_text', 'comment_time']










