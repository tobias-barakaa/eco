from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myOrders'),
    path('/', views.getOrders, name='Orders'),
    path('<str:pk>/delivered', views.updateOrderToDelivered, name='Order-delivered'),
    
    
    
    path('<str:pk>/', views.getOrderById, name='user-add'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='pay'),
    
    
    
    
    
    
]
