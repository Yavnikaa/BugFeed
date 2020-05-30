from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bugfeed import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'comments',views.CommentsViewSet)
router.register(r'projects',views.ProjectsViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'bugs', views.BugsViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('wiki_media/',views.Wiki_Media.as_view()),
]
