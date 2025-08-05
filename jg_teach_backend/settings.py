"""
Django settings for jg_teach_backend project.
...
"""

from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url  # Se importa la librería para la base de datos
from whitenoise.middleware import WhiteNoiseMiddleware # Se importa Whitenoise

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-bd2-n*)p&7_1!y58!8&3klbp%d$_zit#z^cg-^szu(*mwmd5h+')

# Cambia DEBUG a False en producción para mayor seguridad
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# ALLOWED_HOSTS para producción. Heroku asignará una URL pública.
if DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'jimenazgarciateach.herokuapp.com').split(',') # Reemplaza con la URL de tu app Heroku

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'users',
    'courses',
    'evaluations',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Para manejar los encabezados de Whitenoise para los archivos estáticos
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://jimenazgarciateach.web.app",
    "https://jimenazgarciateach.herokuapp.com" # Agregamos la URL de Heroku
]

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'jg_teach_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jg_teach_backend.wsgi.application'

# Configuración de la base de datos de Heroku.
# Heroku asigna una variable de entorno `DATABASE_URL`.
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL', 'postgresql://postgres:W198515w@localhost:5432/jg_teach_db')
    )
}

# ... (El resto de la configuración permanece igual)

# Static files (CSS, JavaScript, Images)
# Configuración para servir archivos estáticos con Whitenoise en producción.
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ... (El resto del archivo)
