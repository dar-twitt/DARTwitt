from django.contrib.auth.models import User
from rest_framework import generics
from user.serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return UserSerializer

    def perform_create(self, serializer):
        username = self.request.data.pop('username')
        password = self.request.data.pop('password')
        # email = self.request.data.pop('email')
        user, created = User.objects.get_or_create(username=username)
        # user.set_email(email)
        user.set_password(password)
        user.save()
