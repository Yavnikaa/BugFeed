from rest_framework import permissions
from bugfeed.models import *

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self,request,view,obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user

class MasterPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        masters = request.users.objects.filter(is_master = True)

        if (users == masters):
            return True

        else:
            return False
