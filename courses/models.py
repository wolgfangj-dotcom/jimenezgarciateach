# courses/models.py
from django.db import models
from django.conf import settings # Importa settings para referenciar AUTH_USER_MODEL

class Category(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

    def __str__(self):
        return self.nombre

class Course(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    categoria = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='courses')
    creado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_courses')
    
    # ¡NUEVOS CAMPOS AÑADIDOS!
    estado = models.CharField(
        max_length=20,
        choices=[
            ('BORRADOR', 'Borrador'),
            ('REVISION', 'En Revisión'),
            ('PUBLICADO', 'Publicado'),
            ('ARCHIVADO', 'Archivado'),
        ],
        default='BORRADOR'
    )
    aprobado_por_supervisor = models.BooleanField(default=False)
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)
    url_imagen_portada = models.URLField(max_length=500, blank=True, null=True)


    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"
        ordering = ['titulo']

    def __str__(self):
        return self.titulo

class Module(models.Model):
    curso = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Módulo"
        verbose_name_plural = "Módulos"
        ordering = ['orden']
        unique_together = ('curso', 'orden')

    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"

class Lesson(models.Model):
    TEXT = 'TEXT'
    VIDEO = 'VIDEO'
    QUIZ = 'QUIZ'
    SIMULATOR = 'SIMULATOR'
    ACTIVITY = 'ACTIVITY'
    FORUM = 'FORUM'
    PDF = 'PDF'
    PPT = 'PPT'

    LESSON_TYPES = [
        (TEXT, 'Texto'),
        (VIDEO, 'Video'),
        (QUIZ, 'Quiz'),
        (SIMULATOR, 'Simulador'),
        (ACTIVITY, 'Actividad'),
        (FORUM, 'Foro'),
        (PDF, 'Documento PDF'),
        (PPT, 'Presentación PPT'),
    ]

    modulo = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    titulo = models.CharField(max_length=200)
    tipo = models.CharField(max_length=20, choices=LESSON_TYPES, default=TEXT)
    contenido = models.TextField(blank=True, null=True)
    url_recurso = models.URLField(max_length=500, blank=True, null=True)
    file_resource = models.FileField(upload_to='lesson_files/', blank=True, null=True)
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Lección"
        verbose_name_plural = "Lecciones"
        ordering = ['orden']
        unique_together = ('modulo', 'orden')

    def __str__(self):
        return f"{self.modulo.titulo} - {self.titulo} ({self.get_tipo_display()})"

class ContentAssignment(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='content_assignments')
    curso = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, related_name='assigned_content')
    modulo = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, blank=True, related_name='assigned_content')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True, related_name='assigned_content')
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    completado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Asignación de Contenido"
        verbose_name_plural = "Asignaciones de Contenido"
        unique_together = ('usuario', 'curso', 'modulo', 'lesson')

    def __str__(self):
        if self.lesson:
            return f"Asignación de lección {self.lesson.titulo} a {self.usuario.username}"
        elif self.modulo:
            return f"Asignación de módulo {self.modulo.titulo} a {self.usuario.username}"
        elif self.curso:
            return f"Asignación de curso {self.curso.titulo} a {self.usuario.username}"
        return f"Asignación a {self.usuario.username}"

class CourseProgress(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='course_progresses')
    curso = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_progresses')
    porcentaje_completado = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_ultimo_acceso = models.DateTimeField(auto_now=True)
    completado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Progreso del Curso"
        verbose_name_plural = "Progresos del Curso" # Corregido
        unique_together = ('usuario', 'curso')

    def __str__(self):
        return f"Progreso de {self.usuario.username} en {self.curso.titulo}: {self.porcentaje_completado}%"

class LessonProgress(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progresses')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='lesson_progresses')
    completado = models.BooleanField(default=False)
    fecha_completado = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Progreso de Lección"
        verbose_name_plural = "Progresos de Lección" # Corregido
        unique_together = ('usuario', 'lesson')

    def __str__(self):
        status = "Completado" if self.completado else "Pendiente"
        return f"Progreso de {self.usuario.username} en {self.lesson.titulo}: {status}"

