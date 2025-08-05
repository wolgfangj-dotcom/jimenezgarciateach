# D:\JimenezGarciateach\evaluations\urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Importa SOLO los ViewSets que definiste en evaluations/views.py
from .views import (
    EvaluationViewSet,
    QuestionViewSet,
    OptionViewSet,
    QuizAttemptViewSet,
    AnswerViewSet
)

router = DefaultRouter()
router.register(r'evaluations', EvaluationViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'options', OptionViewSet)
router.register(r'quiz-attempts', QuizAttemptViewSet)
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]