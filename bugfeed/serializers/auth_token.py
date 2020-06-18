from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(
        label=_("username"),
        write_only=True
    )
    token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )

    def validate(self, attrs):
        username = attrs.get('username')

        if username:
            user = authenticate(request=self.context.get('request'),
                                username=username)

            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "enrol_number"')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
