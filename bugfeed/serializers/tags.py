from rest_framework import serializers
from bugfeed.models.tags import Tags

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'

