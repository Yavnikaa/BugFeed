from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bugfeed import views
from knox import views as knox_views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'comments',views.CommentsViewSet)
router.register(r'projects',views.ProjectsViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'bugs', views.BugsViewSet)
router.register(r'my', views.MyViewSet , basename='my')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('wiki_media/',views.Wiki_Media.as_view()),
    path('auth/<code>', views.AuthView.as_view()),
    path('api-auth/login/', views.LoginView.as_view(), name='knox_login'),
    path('api-auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api-auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
