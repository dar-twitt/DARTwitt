from rest_framework import serializers
from user.serializers import UserSerializer


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    avatar = serializers.ImageField(required=False)
    bio = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    following = UserSerializer(required=False)
    followers = UserSerializer(required=False)
    user = UserSerializer(required=True)

    class Meta:
        fields = '__all__'
