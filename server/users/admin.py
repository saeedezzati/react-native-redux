from django import forms
from django.contrib import admin
from users.models import User, Get_Notified

from django.contrib.auth.models import Group as UserGroup
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    fieldsets = [
        ('User Info', {'fields': ['username', 'password', 'first_name', 'last_name', 'email', 'phonenumber', 'birthdate', 'height', 'weight', 'is_superuser', 'is_staff', 'is_active', 'avatar', 'user_permissions', 'groups']}),
        ('Date information', {'fields': ['date_joined', 'last_login' ]}),
        ('games', {'fields': [ 'role']}),
    ]
    # inlines = [ChoiceInline]
    list_display = ('username', 'email', 'is_superuser', 'role')
    list_filter = ['is_superuser', 'is_staff']
    search_fields = ['username']

admin.site.register(User, UserAdmin)
admin.site.unregister(UserGroup)


class GetNotifiedAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    fieldsets = [
        ('User Info', {'fields': ['email']}),
        ('Date information', {'fields': ['date', 'time']}),
        ('browser information', {'fields': ['appCodeName', 'appName', 'language', 'platform', 'vendor', 'width', 'height']}),
    ]
    # inlines = [ChoiceInline]
    list_display = ('email', 'date', 'vendor', 'platform')
    list_filter = ['date', 'vendor', 'platform']
    search_fields = ['email']

admin.site.register(Get_Notified, GetNotifiedAdmin)