# File: your_project_name/urls.py

from django.contrib import admin
from django.urls import path, include
# Importamos el módulo de vistas de la aplicación principal
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # AGREGAMOS ESTA LÍNEA para manejar la URL raíz
    path('', views.home, name='home'),
    path('api/', include('users.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('evaluations.urls')),
]
#python
# File: your_project_name/views.py
# (Crea este archivo en la misma carpeta que urls.py si no existe)

from django.http import HttpResponse

def home(request):
    """
    Una vista simple para la página de inicio que retorna una respuesta HTTP.
    """
    return HttpResponse("<h1>¡Hola! ¡La página de inicio está funcionando en Render!</h1>")
