from rest_framework import serializers
from bugfeed.serializers.users import UserSerializer
from rest_auth.models import TokenModel

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = TokenModel
        fields = ('key', 'user')

