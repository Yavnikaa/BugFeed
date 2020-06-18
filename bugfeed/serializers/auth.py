from rest_framework import serializers

class AuthSerializer(serializers.Serializer):
    client_id = serializers.CharField(required = True)
    client_secret = serializers.CharField(required = True)
    grant_type = serializers.CharField(required = True)
    redirect_url = serializers.CharField(required = True)
    code = serializers.CharField(required = True)

