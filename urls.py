from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # La p\u00e1gina de inicio del sitio web la maneja la aplicaci\u00f3n 'user'
    path('', include('user.urls')),
    # Las rutas de la API y el sitio web de 'courses'
    path('courses/', include('courses.urls')),
    # Las rutas de la API y el sitio web de 'evaluation'
    path('evaluation/', include('evaluation.urls')),
]
