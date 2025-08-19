from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, CourseViewSet, ModuleViewSet, LessonViewSet, ContentAssignmentViewSet, CourseProgressViewSet, LessonProgressViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'content-assignments', ContentAssignmentViewSet)
router.register(r'course-progress', CourseProgressViewSet)
router.register(r'lesson-progress', LessonProgressViewSet)

urlpatterns = [
    # Esta ruta incluir\u00e1 todas las URLs de la API bajo el prefijo 'api/'
    # Por ejemplo, /courses/api/categories/
    path('api/', include(router.urls)),
    ]