from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        first_name=None,
        last_name=None,
        password=None,
        is_active=True,
        is_staff=False,
        is_admin=False,
        is_customer=True,
    ):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user_obj = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user_obj.set_password(password)  # change user password
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.is_active = is_active
        user_obj.customer = is_customer
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, first_name=None, last_name=None, password=None):
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_staff=True,
        )
        return user

    def create_superuser(self, email, first_name=None, last_name=None, password=None):
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_staff=True,
            is_admin=True,
        )
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)  # can login
    staff = models.BooleanField(default=False)  # staff user non superuser
    admin = models.BooleanField(default=False)  # superuser
    timestamp = models.DateTimeField(auto_now_add=True)
    customer = models.BooleanField(default=True)
    # confirmed_date     = models.DateTimeField(default=False)

    USERNAME_FIELD = "email"  # username
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = ["first_name", "last_name"]

    # python manage.py createsuperuser

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        pass

    def get_short_name(self):
        pass

    @property
    def is_superuser(self):
        return self.admin

    @property
    def is_staff(self):
        return self.admin

    def has_perm(self, perm, obj=None):
        return self.admin

    def has_module_perms(self, app_label):
        return self.admin

    @is_staff.setter
    def is_staff(self, value):
        self.staff = value

    # @property
    # def is_active(self):
    #     return self.active


class ProfileModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    address = models.CharField(max_length=500, null=True, blank=True)
    phone_number = models.CharField(
        max_length=10,
        validators=[RegexValidator(r"^\+?1?\d{9,15}$")],
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.user.first_name


class AddressModel(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(
        max_length=10,
        validators=[RegexValidator(r"^\+?1?\d{9,15}$")],
        null=False,
        blank=False,
    )
    pin_code = models.CharField(
        max_length=6, validators=[RegexValidator(r"^\d{0,9}$")], null=False, blank=False
    )
    house_no = models.CharField(max_length=300, null=False, blank=False)
    landmark = models.CharField(max_length=120, null=False, blank=False)
    city = models.CharField(max_length=120, null=False, blank=False)
    state = models.CharField(max_length=120, null=False, blank=False)

    def __str__(self):
        return self.name
