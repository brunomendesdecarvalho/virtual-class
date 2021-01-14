from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import *
from .serializers import *


class ProfessorList(generics.ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    name = 'professor-list'
    

class ProfessorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    name = 'professor-detail'


class AlunoList(generics.ListCreateAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'alunos-list'
    

class AlunoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'aluno-detail'


class SalaList(generics.ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'salas-list'
    

class SalaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'sala-detail'


class AtividadeList(generics.ListCreateAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividades-list'
    

class AtividadeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividade-detail'


class ApiRoot(generics.GenericAPIView):
    name='classroom'
    def get(self, request, *args, **kwargs):
        return Response({
            'professores': reverse(ProfessorList.name, request=request),
            'alunos': reverse(AlunoList.name, request=request),
            'salas': reverse(SalaList.name, request=request),
            'atividades': reverse(AtividadeList.name, request=request),
        })