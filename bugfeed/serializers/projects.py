from rest_framework import serializers
from bugfeed.models.projects import Projects
from bugfeed.serializers.bugs import BugsSerializer

from slugify import slugify

class ProjectSerializer(serializers.ModelSerializer):

    Bugs = BugsSerializer(source='bugs_set', many=True, read_only=True)
    projectslug = serializers.SerializerMethodField('projectSlug')

    def projectSlug(self, obj):
        return slugify(obj.project_name)

    class Meta:
        model = Projects
        fields='__all__'


    



