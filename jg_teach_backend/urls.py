# jg_teach_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import os # Importa os para os.path.join

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('users.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('evaluations.urls')),
]

# Sirve archivos estáticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Sirve la carpeta 'tools' bajo el prefijo /static/tools/
    urlpatterns += static('/static/tools/', document_root=os.path.join(settings.BASE_DIR, 'courses', 'static', 'tools'))
    # ¡NUEVO! Sirve los archivos media en desarrollo
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

