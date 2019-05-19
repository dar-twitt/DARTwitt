from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from homepage.models import Profile
from post.models import Post
from post.serializers import PostSerializer


class ProfilesPostAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_profile(self, pk1):
        try:
            profile = Profile.objects.get(id=pk1)
        except Profile.DoesNotExist:
            raise Http404
        return profile

    def get(self, request, pk1, pk2):
        try:
            post = self.get_profile(pk1=pk1).posts.get(id=pk2)
        except Post.DoesNotExist:
            raise Http404
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk1, pk2):
        try:
            instance = self.get_profile(pk1=pk1).posts.get(id=pk2)
        except Post.DoesNotExist:
            raise Http404
        serializer = PostSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk1, pk2):
        try:
            post = self.get_profile(pk1=pk1).posts.get(id=pk2)
        except Post.DoesNotExist:
            raise Http404
        post.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
