# jg_teach_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import os 
from users.views import user_home # <-- Aseg\u00farate de que esta l\u00ednea est\u00e9 aqu\u00ed

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('users.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('evaluations.urls')),
    path('', user_home),  # <-- Agrega esta l\u00ednea
]

# Sirve archivos est\u00e1ticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Sirve la carpeta 'tools' bajo el prefijo /static/tools/
    urlpatterns += static('/static/tools/', document_root=os.path.join(settings.BASE_DIR, 'courses', 'static', 'tools'))
    # \u00a1NUEVO! Sirve los archivos media en desarrollo
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)