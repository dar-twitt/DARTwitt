from django.urls import path
from homepage import views

urlpatterns = [
    path('', views.ProfilesAPIView.as_view()),
    path('own/', views.ProfileByUserAPIVIew.as_view()),
    path('<int:pk>/', views.ProfileAPIView.as_view()),
    path('<int:pk>/following/', views.ProfileFollowingAPIView.as_view()),
    path('<int:pk>/followers/', views.ProfileFollowersAPIView.as_view()),
    path('<int:pk1>/follow/<int:pk2>/', views.ProfileFollowOperation.as_view()),
    path('<int:pk>/posts/', views.ProfilesPostsAPIView.as_view()),
    path('<int:pk>/create/', views.ProfilesPostsCreateAPIView.as_view()),
    path('<int:pk1>/posts/<int:pk2>/', views.ProfilesPostAPIView.as_view())
]
