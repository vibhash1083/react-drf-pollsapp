from django.urls import path
from pollsapp import routers

from . import views
from . import api

router = routers.SharedAPIRootRouter()
router.register(r'questions', api.QuesViewSet)
router.register(r'choices', api.ChoiceViewSet)

urlpatterns = [
    path('', views.index, name='index'),
]
