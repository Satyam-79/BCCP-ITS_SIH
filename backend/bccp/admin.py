from django.contrib import admin
from .models import Tag, ProductImageModel, ProductModel

# Register your models here.
admin.site.register(Tag)
admin.site.register(ProductImageModel)
admin.site.register(ProductModel)
