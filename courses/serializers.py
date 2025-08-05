# D:\JimenezGarciateach\courses\serializers.py

from rest_framework import serializers
from .models import (
    Category,
    Course,
    Module,
    Lesson,
    CourseProgress,
    LessonProgress,
    ContentAssignment
)
# No necesitas importar User ni Group de users.models aquí si solo los referencian los ForeignKey.
# from users.models import User, Group 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    creador_username = serializers.ReadOnlyField(source='creador.username')
    category_name = serializers.ReadOnlyField(source='category.nombre')

    class Meta:
        model = Course
        fields = [
            'id', 'titulo', 'descripcion', 'creador', 'creador_username',
            'fecha_creacion', 'fecha_actualizacion', 'estado',
            'aprobado_por_supervisor', 'fecha_aprobacion',
            'categoria', 'category_name', 'url_imagen_portada'
        ]

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        # ¡NUEVO! Añade 'file_resource' a los campos
        fields = '__all__' # O puedes listar los campos específicos incluyendo 'file_resource'

class CourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgress
        fields = '__all__'

class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = '__all__'

class ContentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentAssignment
        fields = '__all__'

