from rest_framework import serializers
from rest_framework.validators import UniqueValidator
# from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=get_user_model().objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    customer = serializers.BooleanField(required=True)

    class Meta:
        model = get_user_model()
        fields = (
            "password",
            "password2",
            "email",
            "first_name",
            "last_name",
            "customer",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = get_user_model().objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            customer=validated_data["customer"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True, validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     username = serializers.CharField(
#         max_length=32, validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(min_length=8, write_only=True)

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             validated_data["username"],
#             validated_data["email"],
#             validated_data["password"],
#         )
#         return user

#     class Meta:
#         model = User
#         fields = ("id", "username", "email", "password")
