# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Importa los modelos de autenticación de Django directamente
from django.contrib.auth.models import Group as AuthGroupDefault, Permission, User as AuthUser

# Importa tus modelos personalizados
from .models import Role, Group, UserGroup, UserProfile 

# --- Registro del modelo de usuario predeterminado de Django con nuestro inline ---
# Inline para UserProfile en UserAdmin
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Información de Rol'
    fields = ('rol',) # Solo mostrar el campo 'rol' aquí

# Desregistrar el UserAdmin predeterminado de Django si ya está registrado
try:
    admin.site.unregister(AuthUser)
except admin.sites.NotRegistered:
    pass

@admin.register(AuthUser) # Registrar el modelo de usuario predeterminado de Django
class CustomUserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,) # Añadir el inline del perfil de usuario
    list_display = BaseUserAdmin.list_display + ('get_role',) # Añadir 'Rol' a la lista

    def get_role(self, obj):
        # Asegurarse de que el perfil exista antes de intentar acceder a él
        return obj.profile.rol.nombre if hasattr(obj, 'profile') and obj.profile.rol else 'N/A'
    get_role.short_description = 'Rol' # Nombre de la columna en la lista


# --- Registro de tus Modelos Personalizados ---

# Registra tu modelo Role
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'get_tipo_rol_display',) # Muestra el ID autoincremental y el tipo_rol
    search_fields = ('nombre', 'tipo_rol',)
    filter_horizontal = ('permissions_groups',) # Para gestionar los grupos de permisos asociados al rol

    def get_tipo_rol_display(self, obj):
        return obj.get_tipo_rol_display()
    get_tipo_rol_display.short_description = 'Tipo de Rol'


# Registra tu modelo Group personalizado (para agrupar estudiantes)
@admin.register(Group)
class CustomGroupAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'creado_por', 'fecha_creacion',)
    search_fields = ('nombre', 'creado_por__username',)

# Registra tu modelo UserGroup
@admin.register(UserGroup)
class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('user', 'group',)
    list_filter = ('group',)

# --- Re-registro explícito de los modelos de autenticación de Django ---
# Esto asegura que "Permissions" y "Groups" aparezcan en el admin
# Desregistrar si ya está registrado por defecto (para evitar errores si ya lo están)
try:
    admin.site.unregister(AuthGroupDefault)
except admin.sites.NotRegistered:
    pass
admin.site.register(AuthGroupDefault) # Volver a registrarlo

try:
    admin.site.unregister(Permission)
except admin.sites.NotRegistered:
    pass
admin.site.register(Permission) # Volver a registrarlo

