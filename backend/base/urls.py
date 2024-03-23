from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="routes"),
    path('products/<str:pk>/', views.getProduct, name="routes"),
    
    # users
    
    path('users/profile/', views.getUserProfile, name="user-profile")
    
    
    
]
