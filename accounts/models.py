from django.db import models

from django.db import models
from .manager import UserManager

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin



class User(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(max_length=254, unique=True)
    type = models.CharField(max_length=254, unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['type']

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)
