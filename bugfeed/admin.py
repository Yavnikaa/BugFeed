from django.contrib import admin
from bugfeed.models import *

class BugInline(admin.TabularInline):
    model = Project_bugs
    fields = ['bug_heading','category','status', 'assigned_to']
    extra = 4

class TeamInline(admin.StackedInline):
    model = Team
    fields= ['project_member']
    extra = 2

class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
            ('Project' , {'fields': ['project_name', 'project_link', 'priority_value']}),
            ('Date' , {'fields': ['project_date']})
    ]
    inlines = [TeamInline, BugInline]

admin.site.register (Projects,ProjectAdmin)


# Register your models here.
