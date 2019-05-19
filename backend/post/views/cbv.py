from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from post.models import Post, Like, Comment
from post.serializers import LikeSerializer, CommentSerializer
from django.http import Http404


class PostLikeAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_post(self, pk1):
        try:
            post = Post.objects.get(id=pk1)
        except Post.DoesNotExist:
            raise Http404
        return post

    def get(self, request, pk1, pk2):
        try:
            like = self.get_post(pk1=pk1).likes.get(id=pk2)
        except Like.DoesNotExist:
            raise Http404
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk1, pk2):
        try:
            like = self.get_post(pk1=pk1).likes.get(id=pk2)
        except Like.DoesNotExist:
            raise Http404
        like.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class PostCommentAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_post(self, pk1):
        try:
            post = Post.objects.get(id=pk1)
        except Post.DoesNotExist:
            raise Http404
        return post

    def get(self, request, pk1, pk2):
        try:
            comment = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk1, pk2):
        try:
            instance = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        serializer = CommentSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk1, pk2):
        try:
            comment = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        comment.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
