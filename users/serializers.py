# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model # Importa la función para obtener el modelo de usuario activo
from .models import Role # Importa tu modelo Role

# Obtiene el modelo de usuario activo de Django
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined'] # Campos que no se pueden modificar directamente

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

