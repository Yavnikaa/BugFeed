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
    
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = [ 'enrol_number', 'degree_name' , 'branch_name']
        read_only_fields = ['full_name']

class BugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_bugs
        exclude = ['bug_description']
        read_only_fields = ['bug_heading','timestamp']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
        read_only_fields = ['comment_by', 'comment_text', 'comment_time']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
        










