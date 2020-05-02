from rest_framework import permissions
from bugfeed.models import *

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self,request,view,obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class MasterPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        is_master = request.user.is_master
        return is_master


class TeamPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.team_member_related == request.user


#Used reverse-names to establish the relation and give permission

