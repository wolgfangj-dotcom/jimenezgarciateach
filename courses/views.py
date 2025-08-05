# D:\JimenezGarciateach\courses\views.py
from rest_framework import viewsets
from rest_framework import permissions
from .models import Category, Course, Module, Lesson, ContentAssignment, CourseProgress, LessonProgress
from .serializers import CategorySerializer, CourseSerializer, ModuleSerializer, LessonSerializer, ContentAssignmentSerializer, CourseProgressSerializer, LessonProgressSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all() # Asegúrate de que esto sea correcto
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class ContentAssignmentViewSet(viewsets.ModelViewSet):
    queryset = ContentAssignment.objects.all()
    serializer_class = ContentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseProgressViewSet(viewsets.ModelViewSet):
    queryset = CourseProgress.objects.all()
    serializer_class = CourseProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonProgressViewSet(viewsets.ModelViewSet):
    queryset = LessonProgress.objects.all()
    serializer_class = LessonProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

