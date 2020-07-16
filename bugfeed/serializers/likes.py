from rest_framework import serializers
from bugfeed.models.likes import Likes

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'

