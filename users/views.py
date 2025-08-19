# users/views.py
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth import get_user_model # Importa la función para obtener el modelo de usuario activo
from .models import Role # Importa tu modelo Role
from .serializers import UserSerializer, RoleSerializer
from django.shortcuts import render

# La vista de tu sitio web (p\u00e1gina de inicio)
def user_home(request):
    return render(request, 'users/index.html')

# Obtiene el modelo de usuario activo de Django
User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated] # O ajusta tus permisos según necesites

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated] # O ajusta tus permisos según necesites

