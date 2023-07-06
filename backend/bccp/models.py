from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model


class Tag(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    name = models.CharField(max_length=200)
    seller = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, null=False, blank=False
    )
    description = models.CharField(max_length=200, null=True, blank=True)

    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.name

    def imageURL(self):
        return ProductImageModel.objects.all(Product=self.id)

    @property
    def tag_number(self):
        return self.tags.count


class ProductImageModel(models.Model):
    product = models.ForeignKey(
        ProductModel, related_name="images", default=None, on_delete=models.CASCADE
    )
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.product.name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
