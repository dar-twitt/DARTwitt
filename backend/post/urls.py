from django.urls import path
from post import views

urlpatterns = [
    path('', views.PostsAPIView.as_view()),
    path('<int:pk>/', views.PostAPIView.as_view()),
    path('<int:pk>/like/', views.PostLikesAPIView.as_view()),
    path('<int:pk1>/like/<int:pk2>/', views.PostLikeAPIView.as_view()),
    path('<int:pk>/comment/', views.PostCommentsAPIView.as_view()),
    path('<int:pk1>/comment/<int:pk2>/', views.PostCommentAPIView.as_view())
]
