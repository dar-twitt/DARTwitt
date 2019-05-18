from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    avatar = models.ImageField(default=None, null=True)
    bio = models.CharField(max_length=200, default='')
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    following = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=None, related_name='following')
    followers = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=None, related_name='followers')

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
