from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, RoleViewSet, user_home # 1. Importa la nueva vista 'user_home'

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'roles', RoleViewSet)

urlpatterns = [
    # Secci\u00f3n 1: Rutas del sitio web.
    # Esta ser\u00e1 la p\u00e1gina de inicio del sitio web (URL: /)
    path('', user_home, name='user_home'), 

    # Secci\u00f3n 2: Rutas de la API (con el prefijo 'api/')
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Incluye las rutas del router bajo el prefijo 'api/'
    path('api/', include(router.urls)),
]
