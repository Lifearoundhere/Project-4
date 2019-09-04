from django.urls import path
from .views import DocumentList, DocumentDetail

urlpatterns = [
    path('documents/', DocumentList.as_view()),
    path('documents/<int:pk>', DocumentDetail.as_view()),
]
