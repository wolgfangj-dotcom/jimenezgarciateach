# evaluations/serializers.py
from rest_framework import serializers
from .models import Evaluation, Question, Option, QuizAttempt, Answer
from django.contrib.auth import get_user_model # Importa la función para obtener el modelo de usuario activo

# Obtiene el modelo de usuario activo de Django
User = get_user_model()

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

class QuizAttemptSerializer(serializers.ModelSerializer):
    # Asegúrate de que el campo 'usuario' se serialice correctamente
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = QuizAttempt
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

