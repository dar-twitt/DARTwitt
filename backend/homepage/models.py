from django.db import models
from django.contrib.auth.models import User


class ProfileManager(models.Manager):
    def by_username(self, username):
        return self.filter(username=username)


class Profile(models.Model):
    avatar = models.ImageField(upload_to='images', default=None, null=True)
    bio = models.CharField(max_length=200, default='')
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    objects = ProfileManager()

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'


class Follow(models.Model):
    profile1 = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile1')
    profile2 = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile2')

    class Meta:
        verbose_name = 'Follow'
        verbose_name_plural = 'Follows'
