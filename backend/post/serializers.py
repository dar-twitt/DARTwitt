from rest_framework import serializers
from homepage.serializers import ProfileSerializer


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    created_at = serializers.DateTimeField(required=False)
    repost = ProfileSerializer(required=False)
    owner = ProfileSerializer(required=True)

    class Meta:
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(required=False)
    owner = ProfileSerializer(required=True)

    class Meta:
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    post = PostSerializer(required=False)
    # comment = CommentSerializer(required=False)
    owner = ProfileSerializer(required=True)

    class Meta:
        fields = '__all__'
