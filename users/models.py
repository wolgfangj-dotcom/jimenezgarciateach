# users/models.py
from django.db import models
from django.contrib.auth.models import Group as AuthGroup # Importa Group de Django auth
from django.conf import settings # ¡Importante! Para referenciar settings.AUTH_USER_MODEL
from django.db.models.signals import post_save # Importa la señal post_save
from django.dispatch import receiver # Importa el decorador receiver

class Role(models.Model):
    ADMINISTRATOR = 1
    SUPERVISOR = 2
    CONTENT_CREATOR = 3
    STUDENT = 4

    ROLE_CHOICES = (
        (ADMINISTRATOR, 'Administrador'),
        (SUPERVISOR, 'Supervisor'),
        (CONTENT_CREATOR, 'Creador de Contenido'),
        (STUDENT, 'Estudiante'),
    )
    # El ID ahora será autoincremental por defecto (Django lo maneja)
    # Hemos añadido un campo 'tipo_rol' para los choices
    tipo_rol = models.SmallIntegerField(choices=ROLE_CHOICES, unique=True)
    nombre = models.CharField(max_length=50, unique=True)
    permissions_groups = models.ManyToManyField(AuthGroup, blank=True, related_name='roles_assigned')

    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"

    def __str__(self):
        return self.nombre

# Modelo para Grupos personalizados (para agrupar estudiantes, no los grupos de permisos de Django)
class Group(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    # Referencia al modelo de usuario definido en settings.AUTH_USER_MODEL
    creado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_groups')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

    def __str__(self):
        return self.nombre

# Modelo para la relación N:M entre Usuarios y Grupos personalizados
class UserGroup(models.Model):
    # Referencia al modelo de usuario definido en settings.AUTH_USER_MODEL
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'group')
        verbose_name = "Usuario en Grupo"
        verbose_name_plural = "Usuarios en Grupos"

    def __str__(self):
        return f"{self.user.username} en {self.group.nombre}"


# UserProfile para almacenar el rol del usuario (y otros campos si los quisieras)
# Se vincula al modelo de usuario predeterminado de Django (o al que definas en AUTH_USER_MODEL)
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    rol = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    # Puedes añadir aquí los campos adicionales que tenías en tu User personalizado si los necesitas:
    # dni = models.CharField(max_length=20, unique=True, blank=True, null=True)
    # telefono = models.CharField(max_length=20, blank=True, null=True)
    # direccion = models.TextField(blank=True, null=True)
    # foto_perfil_url = models.URLField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Perfil de Usuario (Rol)"
        verbose_name_plural = "Perfiles de Usuario (Roles)"

    def __str__(self):
        return f"Perfil de {self.user.username} - Rol: {self.rol.nombre if self.rol else 'N/A'}"

# Señal para crear un UserProfile automáticamente cuando se crea un nuevo User
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

# Señal para guardar el UserProfile cuando se guarda el User
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
    else:
        # Esto es un fallback, la señal 'created' debería manejarlo
        UserProfile.objects.create(user=instance)

