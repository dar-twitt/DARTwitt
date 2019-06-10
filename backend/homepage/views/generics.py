from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from homepage.serializers import ProfileSerializer
from homepage.models import Profile, Follow
from user.serializers import UserSerializer
from post.serializers import PostSerializer, PostDataSerializer
from rest_framework.response import Response
from django import forms


class ImageUploadForm(forms.Form):
    image = forms.ImageField()


class ImageUploadForm2(forms.Form):
    avatar = forms.ImageField()


class ProfilesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        profiles_by_username = []
        profiles = Profile.objects.all()
        for profile in profiles:
            if username in profile.user.username:
                profiles_by_username.append(profile)
        return profiles_by_username

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ProfileByUserAPIVIew(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class ProfileAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def perform_update(self, serializer):
        form = ImageUploadForm2(self.request.POST, self.request.FILES)
        if form.is_valid():
            avatar = form.cleaned_data['avatar']
            return serializer.save(avatar=avatar)
        return serializer.save()

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete()
        return Response({})


class ProfilesPostsAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostDataSerializer

    def get_queryset(self):
        posts = Profile.objects.get(id=self.kwargs['pk']).posts.all()
        posts_data = []
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


class ProfilesFollowingPostsAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostDataSerializer

    def get_queryset(self):
        p1 = Profile.objects.get(id=self.kwargs['pk'])
        followings = Follow.objects.filter(profile1=p1)
        posts_data = []
        for follow in followings:
            posts = follow.profile2.posts.all()
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


class ProfilesPostsCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def get_queryset(self):
        return Profile.objects.get(id=self.kwargs['pk']).posts.all()

    def perform_create(self, serializer):
        profile = Profile.objects.get(id=self.kwargs['pk'])
        form = ImageUploadForm(self.request.POST, self.request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']
            return serializer.save(owner=profile, image=image)
        return serializer.save(owner=profile, image=None)


class ProfileFollowingAPIView2(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return Profile.objects.get(id=self.request['pk']).following.all()
    # Refactor logic


class ProfileFollowingAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile1 = Profile.objects.get(id=self.kwargs['pk'])
        follows = Follow.objects.filter(profile1=profile1)
        followings = []
        for follow in follows:
            followings.append(follow.profile2)
        return followings


class ProfileFollowersAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile2 = Profile.objects.get(id=self.kwargs['pk'])
        follows = Follow.objects.filter(profile2=profile2)
        followers = []
        for follow in follows:
            followers.append(follow.profile1)
        return followers
