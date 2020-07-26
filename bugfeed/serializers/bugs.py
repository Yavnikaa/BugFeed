from rest_framework import serializers
from bugfeed.models.bugs import Project_bugs
from bugfeed.serializers.comments import CommentsSerializer

class BugsSerializer(serializers.ModelSerializer):

    comments=CommentsSerializer(source='comment_set', many=True , read_only=True)
    reporter_name = serializers.SerializerMethodField('reporterName')
    assigned_to_name = serializers.SerializerMethodField('assignedName')
    project_name = serializers.SerializerMethodField('projectName')

    def reporterName(self,obj):
        return obj.reported_by.name
    
    def assignedName(self,obj):
        if obj.assigned_to != None:
            return obj.assigned_to.name
        else:
            return None

    def projectName(self,obj):
        return obj.project_bug.project_name


    class Meta:
        model = Project_bugs
        exclude = ['bug_description']
        




