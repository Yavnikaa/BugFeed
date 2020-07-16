from rest_framework import permissions
from bugfeed.models import *

class ProjectPermissions(permissions.BasePermission):

    def has_object_permission(self,request,view,obj):

        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True

        return obj.created_by == request.user

class CommentPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True
        
        return obj.comment_by == request.user

class IssueCreationPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True
        elif request.method in permissions.SAFE_METHODS or request.method == 'DELETE' or request.method=='PATCH':
            return obj.reported_by == request.user
        else:
            return False

class MasterPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        return request.user.is_master



class TeamPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.team_member_related == request.user

class LogoPermissions(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True

        return obj.team_member_related == request.user

class IssueEditPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.method == 'PATCH':
            return request.user in obj.team.project_members.all() 

        return False

class ReadOnlyPermissions(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True



