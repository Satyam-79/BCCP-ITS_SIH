# from django.conf.urls import url
from django.urls import path

# from products.views import UserProductHistoryView
from .views import HomeView, LogoutView

urlpatterns = [
    # url(r"^$", AccountHomeView.as_view(), name="home"),
    # url(r"^details/$", UserDetailUpdateView.as_view(), name="user-update"),
    # url(
    #     r"history/products/$",
    #     UserProductHistoryView.as_view(),
    #     name="user-product-history",
    # ),
    # url(r"api/users^$", UserCreate.as_view(), name="account-create"),
    path("home/", HomeView.as_view(), name="home"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
