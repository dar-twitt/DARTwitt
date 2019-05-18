from django.db import models
from homepage.models import Profile


class Post(models.Model):
    image = models.ImageField(default=None, null=True)
    text = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now=True)
    repost = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None, null=True, related_name='repost')
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='owner')

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'


class Comment(models.Model):
    text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=None, null=True)
    # comment = models.ForeignKey(Comment, on_delete=models.CASCADE, default=None, null=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Like'
        verbose_name_plural = 'Likes'
