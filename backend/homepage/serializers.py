from rest_framework import serializers
from user.serializers import UserSerializer
from homepage.models import Profile, Follow


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    avatar = serializers.ImageField(required=False)
    bio = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    following = UserSerializer(required=False)
    followers = UserSerializer(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Profile
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     instance.avatar = validated_data.get('image', instance.image)
    #     instance.text = validated_data.get('text', instance.text)
    #     instance.created_at = validated_data.get('created_at', instance.created_at)
    #     instance.save()
    #     return instance


class FollowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    profile1 = ProfileSerializer(required=False)
    profile2 = ProfileSerializer(required=False)

    class Meta:
        model = Follow
        fields = '__all__'
