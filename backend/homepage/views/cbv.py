from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from homepage.models import Profile, Follow
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


class ProfileRePostAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_profile(self, pk):
        try:
            profile = Profile.objects.get(id=pk)
        except Profile.DoesNotExist:
            raise Http404
        return profile

    def get_post(self, pk):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404
        return post

    def post(self, request, pk1, pk2):
        profile = self.get_profile(pk1)
        post = self.get_post(pk2)
        new_post = Post(image=post.image, owner=profile, repost=post.owner, text=post.text)
        new_post.save()
        return Response({}, status=status.HTTP_201_CREATED)


class ProfileFollowOperation(APIView):
    permission_classes = (IsAuthenticated,)

    def get_profile(self, pk):
        try:
            profile = Profile.objects.get(id=pk)
        except Profile.DoesNotExist:
            raise Http404
        return profile

    def post(self, request, pk1, pk2):
        profile1 = self.get_profile(pk=pk1)
        profile2 = self.get_profile(pk=pk2)
        try:
            Follow.objects.get(profile1=profile1, profile2=profile2)
            return Response({'status': 'already exist'}, status=status.HTTP_200_OK)
        except Follow.DoesNotExist:
            follow = Follow(profile1=profile1, profile2=profile2)
            follow.save()
            return Response({}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk1, pk2):
        profile1 = self.get_profile(pk=pk1)
        profile2 = self.get_profile(pk=pk2)
        follow = Follow.objects.get(profile1=profile1, profile2=profile2)
        follow.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

