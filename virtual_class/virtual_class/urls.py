"""virtual_class URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from classroom import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


urlpatterns = [
    path('professores/', views.ProfessorList.as_view(), name=views.ProfessorList.name),
    path('professores/<int:pk>/', views.ProfessorDetail.as_view(), name=views.ProfessorDetail.name),
    path('alunos/', views.AlunoList.as_view(), name=views.AlunoList.name),
    path('alunos/<int:pk>/', views.AlunoDetail.as_view(), name=views.AlunoDetail.name),
    path('salas/', views.SalaList.as_view(), name=views.SalaList.name),
    path('salas/<int:pk>/', views.SalaDetail.as_view(), name=views.SalaDetail.name),
    path('atividades/', views.AtividadeList.as_view(), name=views.AtividadeList.name),
    path('atividades/<int:pk>/', views.AtividadeDetail.as_view(), name=views.AtividadeDetail.name),
    path('', views.ApiRoot.as_view(), name=views.ApiRoot.name),
    path('users/', views.UserList.as_view(), name=views.UserList.name),
    path('users/<int:pk>/', views.UserDetail.as_view(), name = views.UserDetail.name),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    re_path(r'^login/', obtain_jwt_token),
    re_path(r'^refresh-token/', refresh_jwt_token),
]
