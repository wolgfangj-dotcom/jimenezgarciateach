# evaluations/admin.py
from django.contrib import admin
from .models import Evaluation, Question, Option, QuizAttempt, Answer

# Inline para opciones dentro de preguntas
class OptionInline(admin.TabularInline):
    model = Option
    extra = 1 # Número de formularios extra para opciones vacías
    min_num = 1 # Mínimo de opciones para una pregunta

# Registro del modelo Question
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    # Ajusta los nombres de los campos para que coincidan con el modelo
    list_display = ('texto_pregunta', 'evaluation', 'tipo_pregunta', 'puntuacion')
    # Ajusta los filtros a los campos existentes
    list_filter = ('tipo_pregunta', 'evaluation')
    # Ajusta la búsqueda para el texto de la pregunta y el título de la evaluación
    search_fields = ('texto_pregunta', 'evaluation__titulo')
    inlines = [OptionInline] # Muestra las opciones directamente en el formulario de la pregunta

# Inline para respuestas dentro de un intento de quiz
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0 # No mostrar formularios vacíos por defecto
    # Ajusta los nombres de los campos para que coincidan con el modelo
    # 'true_false_answer' y 'score_awarded' no existen en el modelo Answer
    readonly_fields = ('question', 'opcion_seleccionada', 'texto_respuesta', 'es_correcta')
    can_delete = False # No permitir borrar respuestas desde aquí

# Registro del modelo QuizAttempt
@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    # Ajusta los nombres de los campos para que coincidan con el modelo
    # 'end_time' no existe en el modelo, 'fecha_intento' es el campo de tiempo
    list_display = ('usuario', 'evaluation', 'fecha_intento', 'puntuacion_obtenida', 'completado')
    # Ajusta los filtros a los campos existentes
    list_filter = ('completado', 'evaluation', 'usuario')
    # Ajusta la búsqueda para el nombre de usuario y el título de la evaluación
    search_fields = ('usuario__username', 'evaluation__titulo')
    inlines = [AnswerInline] # Muestra las respuestas del intento
    # Ajusta los nombres de los campos para que coincidan con el modelo
    # 'end_time' no existe en el modelo
    readonly_fields = ('fecha_intento', 'puntuacion_obtenida', 'completado') # Estos campos se llenan automáticamente o al finalizar

# Registro del modelo Evaluation
@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    # Ajusta los nombres de los campos para que coincidan con el modelo
    # 'student', 'score', 'evaluated_at' no existen directamente en Evaluation
    # 'lesson' es el campo que conecta con la lección
    list_display = ('titulo', 'lesson', 'creado_por', 'fecha_creacion', 'fecha_actualizacion')
    # Ajusta los filtros a los campos existentes
    list_filter = ('lesson', 'creado_por')
    # Ajusta la búsqueda para el título de la evaluación, el título de la lección y el nombre de usuario del creador
    search_fields = ('titulo', 'descripcion', 'lesson__titulo', 'creado_por__username')
    # Puedes añadir un inline para Question si quieres crear preguntas directamente desde la evaluación
    # inlines = [QuestionInline] # Necesitarías definir QuestionInline primero, similar a OptionInline

