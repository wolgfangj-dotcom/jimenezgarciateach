# evaluations/models.py
from django.db import models
from django.conf import settings # Importa settings para referenciar AUTH_USER_MODEL
from courses.models import Lesson # Importa el modelo Lesson de tu app 'courses'

class Evaluation(models.Model):
    # Ahora referencia al modelo de usuario predeterminado de Django
    creado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_evaluations')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    # Una evaluación puede estar asociada a una lección
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, null=True, blank=True, related_name='evaluation')

    class Meta:
        verbose_name = "Evaluación"
        verbose_name_plural = "Evaluaciones"

    def __str__(self):
        return self.titulo

class Question(models.Model):
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE, related_name='questions')
    texto_pregunta = models.TextField()
    tipo_pregunta = models.CharField(
        max_length=50,
        choices=[
            ('MULTIPLE_CHOICE', 'Opción Múltiple'),
            ('TRUE_FALSE', 'Verdadero/Falso'),
            ('SHORT_ANSWER', 'Respuesta Corta'),
        ],
        default='MULTIPLE_CHOICE'
    )
    puntuacion = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)

    class Meta:
        verbose_name = "Pregunta"
        verbose_name_plural = "Preguntas"

    def __str__(self):
        return f"Pregunta para {self.evaluation.titulo}: {self.texto_pregunta[:50]}..."

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    texto_opcion = models.CharField(max_length=255)
    es_correcta = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Opción"
        verbose_name_plural = "Opciones"

    def __str__(self):
        return f"Opción para '{self.question.texto_pregunta[:30]}...': {self.texto_opcion}"

class QuizAttempt(models.Model):
    # Ahora referencia al modelo de usuario predeterminado de Django
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_attempts')
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE, related_name='attempts')
    fecha_intento = models.DateTimeField(auto_now_add=True)
    puntuacion_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    completado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Intento de Quiz"
        verbose_name_plural = "Intentos de Quiz"

    def __str__(self):
        return f"Intento de {self.usuario.username} en {self.evaluation.titulo} ({self.fecha_intento.strftime('%Y-%m-%d %H:%M')})"

class Answer(models.Model):
    quiz_attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    # Si es una opción múltiple o V/F, se selecciona una opción
    opcion_seleccionada = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, blank=True, related_name='selected_answers')
    # Para respuestas cortas o abiertas
    texto_respuesta = models.TextField(blank=True, null=True)
    es_correcta = models.BooleanField(default=False) # Determinado por la lógica de evaluación

    class Meta:
        verbose_name = "Respuesta"
        verbose_name_plural = "Respuestas"
        # Asegura que solo haya una respuesta por pregunta por intento
        unique_together = ('quiz_attempt', 'question')

    def __str__(self):
        return f"Respuesta de {self.quiz_attempt.usuario.username} a {self.question.texto_pregunta[:30]}..."

