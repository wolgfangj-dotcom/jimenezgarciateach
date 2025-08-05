# D:\JimenezGarciateach\courses\admin.py
from django.contrib import admin
from .models import Category, Course, Module, Lesson, CourseProgress, LessonProgress, ContentAssignment

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'creado_por', 'fecha_creacion', 'estado')
    list_filter = ('estado', 'categoria', 'creado_por')
    search_fields = ('titulo', 'descripcion')
    raw_id_fields = ('creado_por',) # Para facilitar la selección de usuarios

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'curso', 'orden')
    list_filter = ('curso',)
    search_fields = ('titulo', 'descripcion')
    raw_id_fields = ('curso',)

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'modulo', 'tipo', 'orden', 'url_recurso', 'file_resource') # ¡NUEVO! Muestra file_resource
    list_filter = ('tipo', 'modulo')
    search_fields = ('titulo', 'contenido')
    raw_id_fields = ('modulo',)
    # Asegúrate de que 'file_resource' esté en los campos editables
    fields = ('modulo', 'titulo', 'tipo', 'contenido', 'url_recurso', 'file_resource', 'orden')

@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'curso', 'porcentaje_completado', 'completado')
    list_filter = ('completado', 'curso', 'usuario')
    raw_id_fields = ('usuario', 'curso')

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'lesson', 'completado', 'fecha_completado')
    list_filter = ('completado', 'lesson', 'usuario')
    raw_id_fields = ('usuario', 'lesson')

@admin.register(ContentAssignment)
class ContentAssignmentAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'curso', 'modulo', 'lesson', 'fecha_asignacion', 'completado')
    list_filter = ('completado', 'curso', 'modulo', 'lesson', 'usuario')
    raw_id_fields = ('usuario', 'curso', 'modulo', 'lesson')

