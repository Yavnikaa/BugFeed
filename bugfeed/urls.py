from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from bugfeed.views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet , basename='users')
router.register(r'current_user',MyViewSet,basename='current_user')
router.register(r'comments',CommentViewSet, basename='comments')
router.register(r'projects',ProjectsViewSet , basename='projects')
router.register(r'teams', TeamViewSet, basename='teams')
router.register(r'bugs', BugsViewSet,basename='bugs')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'projectnameslug', ProjectNameSlugViewSet, basename='project_names_and_slugs')
router.register(r'userByEnrNo', UserByEnrNoViewSet, basename='userByEnrNo')
router.register(r'userbugs', UsersIssueTallyViewSet, basename='user_bugs')
router.register(r'projectlogos', LogoViewSet, basename='project_logos')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('wiki_media/',Wiki_Media.as_view()),
]
