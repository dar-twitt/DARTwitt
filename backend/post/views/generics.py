from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from post.models import Post
from post.serializers import PostSerializer, LikeSerializer, CommentSerializer
from django.http import Http404
from homepage.models import Profile


class PostsAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # ok


class PostAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # ok


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


# class PostLikeAPIView(generics.RetrieveDestroyAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = LikeSerializer
#
#     def get_post(self):
#         try:
#             post = Post.objects.get(id=self.kwargs['pk'])
#         except Post.DoesNotExist:
#             raise Http404
#         return post
#
#     def get_queryset(self):
#         return self.get_post().like_set.all()
#
#     # TODO have to be overwritten with cbv


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
    # ok


# class PostCommentAPIView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = CommentSerializer
#
#     def get_post(self):
#         try:
#             post = Post.objects.get(id=self.kwargs['pk'])
#         except Post.DoesNotExist:
#             raise Http404
#         return post
#
#     def get_queryset(self):
#         return self.get_post().comments.all()
#
#     # TODO have to be overwritten with cbv
