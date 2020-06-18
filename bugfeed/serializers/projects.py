from rest_framework import serializers
from bugfeed.models.projects import Projects

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        exclude = ['project_wiki', 'project_link']
        read_only_fields = ['project_date']

    #def create(self, serializer_url_field):
       # project = Projects(
               # project_link = serializers.HyperLinkedIdentityField['project_link']
        #)
        #project.save()
        #return project



