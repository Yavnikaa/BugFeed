from rest_framework import serializers
from bugfeed.models.projects import Projects
from slugify import slugify

class ProjectNameSlugSerializer(serializers.ModelSerializer):
    projectslug = serializers.SerializerMethodField('projectSlug')

    def projectSlug(self, obj):
        return slugify(obj.project_name)

    class Meta:
        model = Projects
        fields = ['id', 'project_name', 'projectslug']
