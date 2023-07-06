from django.urls import path

from .views import ProductView, ProductCreateView, ProductDetailView

urlpatterns = [
    path("products/", ProductView.as_view(), name="products-list"),
    path("product/<str:pk>/", ProductDetailView.as_view(), name="product-details"),
    path("product-create/", ProductCreateView.as_view(), name="product-create"),
]
