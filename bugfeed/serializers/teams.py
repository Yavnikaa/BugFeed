from rest_framework import serializers
from bugfeed.models.teams import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


