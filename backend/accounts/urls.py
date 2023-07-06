# from django.conf.urls import url
from django.urls import path

# from products.views import UserProductHistoryView
from .views import HomeView, LogoutView, RegisterView

urlpatterns = [
    path("home/", HomeView.as_view(), name="home"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('register/', RegisterView.as_view(), name='auth_register'),
]
