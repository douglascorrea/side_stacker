from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from game import views

app_name = 'game'

urlpatterns = [
    path('', views.GameView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
