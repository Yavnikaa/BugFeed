from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from bugfeed.models.users import Users

class AuthBackend(BaseBackend):
    '''
    This authentication backends logs in user without the use of password
    '''

    def authenticate(self, request, userId=None, password=None):
        user = Users.objects.get(userId=userId)
        return user

    def get_user(self, users_id):
        try:
            return Users.objects.get(pk=users_id)
        except User.DoesNotExist:
            return None
