from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

class AuthTokenSerializer(serializers.Serializer):
     userId = serializers.CharField(
        label=_("userId"),
        write_only=True
    )
     
     token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )
     
     def validate(self, attrs):
         
         userId = attrs.get('userId')
         
         if userId:
             user = authenticate(request=self.context.get('request'),
                                userId = userId)

             
             if not user:
                 msg = _('Unable to log in with provided credentials.')
                 raise serializers.ValidationError(msg, code='authorization')
             
         else:
             msg = _('Must include "username"')
             raise serializers.ValidationError(msg, code='authorization')
         
         attrs['user'] = user
         return attrs
