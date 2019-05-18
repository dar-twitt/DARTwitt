from django.urls import path
from user import views
urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),
    path('me/', views.me),
    path('register/', views.UserCreateView.as_view())
]
