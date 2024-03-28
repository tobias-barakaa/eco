from django.urls import path
from base.views import product_views as views


urlpatterns = [
   
       
    path('', views.getProducts, name="routes"),
    path('<str:pk>/', views.getProduct, name="routes"),
    path('upload/', views.uploadImage, name="image-upload"),
    
    path('delete/<str:pk>/', views.deleteProduct, name="delete"),
    path('<str:pk>/review', views.createProductReview, name="create-review"),
    
    
    path('create/', views.createProduct, name="product-create"),
    path('update/<str:pk>', views.updateProduct, name="product-update"),
    
    
    
    
    
]
