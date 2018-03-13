from django.contrib.auth.models import Permission
from rest_framework import serializers
from users.models import User, Get_Notified
from social_django.models import UserSocialAuth
# from  import UserSocialAuth

import json

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        exclude = ('content_type',)


class UserSerializer(serializers.ModelSerializer):
    
    avatar_path = serializers.SerializerMethodField()
    social_auth = serializers.SlugRelatedField(many=True, read_only=True, slug_field='uid') # http://python-social-auth.readthedocs.io/en/latest/configuration/django.html#exceptions-middleware
    class Meta:
        model = User
        fields = ('id', 'last_login', 'is_superuser', 'username','first_name', 'last_name','email', 'phonenumber', 'birthdate', 'role', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', 'avatar_path', 'social_auth' )
        # exclude_when_nested = ('password')
        # exclude = ('password',)
        # read_only_fields = ()
        # depth=1
    def get_avatar_path(self, obj):
        if(obj.avatar):
            return (obj.avatar.url)
        return #null

class UserVisitorSerializer(serializers.ModelSerializer):

    avatar_path = serializers.SerializerMethodField()
    social_auth = serializers.SlugRelatedField(many=True, read_only=True, slug_field='uid')
    class Meta:
        model = User
        fields = ( 'id', 'username','first_name', 'last_name','email', 'phonenumber', 'birthdate', 'role', 'is_active', 'date_joined', 'avatar_path', 'social_auth')
        # exclude = ('password')
        read_only_fields = ( 'id', 'username','first_name', 'last_name','email', 'phonenumber', 'birthdate', 'role', 'referee_games', 'is_active', 'date_joined', 'avatar_path', 'social_auth')
        # depth=1
    def get_avatar_path(self, obj):
        if(obj.avatar):
            return (obj.avatar.url)
        return #null

class UserSocialSerializer(serializers.ModelSerializer):
    extra_data = serializers.SerializerMethodField()
    class Meta:
        model = UserSocialAuth
        fields = ('id', 'user_id', 'provider', 'uid', 'extra_data' )

    def get_extra_data(self, obj):
        return (json.dumps(obj.extra_data))
        # 'id', 'user_id', 'provider', 'uid', 'extra_data': {'auth_time': 1514757397, 'id': '1799534280061052', 'expires': 5113740, 'granted_scopes': ['email', 'public_profile'], 'denied_scopes': None, 'access_token': 'EAAD08rQQTskBANN0wrPCvesqoWzGSqaPYVvTdfPTvUtEs0ybHGFxMvc9p7ZBuzGuCTcOIpKLfmoUBsXivnzVzMfyLPr9MXK6G8EGZBLsnexn92rEWOkWVMLeGcAraVo0xozhoPIIHUoKBBI3iX69pbKrcZAlcKHtOZBze4nDbQZDZD', 'token_type': None}

class GetNotifiedSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Get_Notified
        fields = ('id', 'email', 'date', 'time', 'appCodeName', 'appName', 'language', 'platform', 'vendor', 'width', 'height')
        # read_only_fields = ()
        # depth=1