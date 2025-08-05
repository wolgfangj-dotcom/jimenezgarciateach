from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),       # Incluye las URLs de tu app 'users'
    path('api/', include('courses.urls')),      # Incluye las URLs de tu app 'courses'
    path('api/', include('evaluations.urls')),   # Incluye las URLs de tu app 'evaluations'
    # Puedes ajustar el prefijo 'api/' si lo deseas
]