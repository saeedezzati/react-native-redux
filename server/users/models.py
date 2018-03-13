from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now

from django.core.files.storage import FileSystemStorage
from time import time
import datetime

import os

fs = FileSystemStorage(location=settings.PRIVATE_MEDIA_ROOT)

ROLE_CHOICES = [('player', 'Player'), ('host', 'Host')]

class User(AbstractUser):       
    def get_uplaod_file_name(user, filename):
        filename, file_extension = os.path.splitext(filename)
        return u'images/users/%s/%s_%s%s' % (str(user.id),
                                    str(time()).replace('.', '_'),
                                    "avatar", file_extension) 
    birthdate = models.DateField(null=True)
    height = models.IntegerField( default=0, null=True)
    weight = models.IntegerField( default=0, null=True)
    phonenumber = models.CharField(max_length=20, null=True)
    role = models.CharField(choices = ROLE_CHOICES, max_length=30, null=True) # player, host, referee
    avatar = models.ImageField(storage=fs, upload_to=get_uplaod_file_name, null=True)

class Get_Notified(models.Model):       
    email = models.EmailField(max_length=254, unique=True, null=True)
    date = models.DateField(default=datetime.date.today, null=True)
    time = models.TimeField(default=now, null=True)
    appCodeName = models.CharField(max_length=30, null=True)
    appName = models.CharField(max_length=30, null=True)
    language = models.CharField(max_length=30, null=True)
    platform = models.CharField(max_length=30, null=True)
    vendor = models.CharField(max_length=30, null=True)
    width = models.IntegerField(default=0, null=True)
    height = models.IntegerField(default=30, null=True)

