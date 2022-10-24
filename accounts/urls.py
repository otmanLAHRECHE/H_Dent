from posixpath import basename
from .views import *
from accounts import views

from django.urls import path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/get_all_sources/', views.getAllSources),
    path('api/get_destinations/', views.getAllDestinations),
]