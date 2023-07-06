from rest_framework import serializers
from .models import ProductModel, ProductImageModel, Tag

from django.contrib.auth import get_user_model


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = ["name", "description", "tags"]

    def save(self, context, **kwargs):
        seller = get_user_model().objects.get(email=context["user"])
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        validated_data["seller"] = seller
        tags = context.get("tags")

        self.instance = self.create(validated_data)
        for tag in tags:
            tag = Tag.objects.get(name=tag)
            self.instance.tags.add(tag)
        return self.instance


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImageModel
        fields = ["product", "image"]
