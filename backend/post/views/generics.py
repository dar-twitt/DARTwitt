from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from post.models import Post
from post.serializers import PostSerializer, LikeSerializer, CommentSerializer, PostDataSerializer
from django.http import Http404
from homepage.models import Profile


class PostsAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostDataSerializer
    # queryset = Post.objects.all()

    def get_queryset(self):
        posts = Post.objects.all()
        posts_data = []
        print(posts)
        for post in posts:
            likes = post.likes.all()
            comments = post.comments.all()
            np = {
                'post': post,
                'likes': likes,
                'comments': comments
            }
            posts_data.append(np)
        return posts_data


class PostAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostLikesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LikeSerializer

    def get_post(self):
        try:
            post = Post.objects.get(id=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404
        return post

    def get_queryset(self):
        return self.get_post().likes.all()

    def perform_create(self, serializer):
        return serializer.save(post=self.get_post(), owner=Profile.objects.get(user=self.request.user))
    # ok


class PostCommentsAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def get_post(self):
        try:
            post = Post.objects.get(id=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404
        return post

    def get_queryset(self):
        return self.get_post().comments.all()

    def perform_create(self, serializer):
        return serializer.save(post=self.get_post(), owner=Profile.objects.get(user=self.request.user))

