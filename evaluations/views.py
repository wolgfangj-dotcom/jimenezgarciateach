# evaluations/views.py
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth import get_user_model # Importa la función para obtener el modelo de usuario activo
from .models import Evaluation, Question, Option, QuizAttempt, Answer
from .serializers import EvaluationSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer, AnswerSerializer

# Obtiene el modelo de usuario activo de Django
User = get_user_model()

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Permite lectura a no autenticados

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class QuizAttemptViewSet(viewsets.ModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios autenticados pueden gestionar intentos de quiz

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios autenticados pueden gestionar respuestas

