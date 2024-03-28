from django.urls import path
from base.views import product_views as views


urlpatterns = [
   
       
    path('', views.getProducts, name="routes"),
    path('<str:pk>/', views.getProduct, name="routes"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete"),
    
    
    
    
    
]
