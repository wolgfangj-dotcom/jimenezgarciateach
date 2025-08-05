# D:\JimenezGarciateach\courses\urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, CourseViewSet, ModuleViewSet, LessonViewSet, ContentAssignmentViewSet, CourseProgressViewSet, LessonProgressViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'courses', CourseViewSet) # Asegúrate de que 'courses' esté aquí
router.register(r'modules', ModuleViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'content-assignments', ContentAssignmentViewSet)
router.register(r'course-progress', CourseProgressViewSet)
router.register(r'lesson-progress', LessonProgressViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

