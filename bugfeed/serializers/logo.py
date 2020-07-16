from rest_framework import serializers
from bugfeed.models.logo import Logo_ideas

class LogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo_ideas
        fields = '__all__'
