from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from .models import *
from .serializers import *
from .permissions import *
from django.contrib.auth import get_user_model


User = get_user_model()


class ProfessorList(generics.ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    name = 'professor-list'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (permissions.IsAdminUser,)
    

class ProfessorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    name = 'professor-detail'
    throttle_scope = 'user'
    permission_classes = (permissions.IsAdminUser,)
    


class AlunoList(generics.ListCreateAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'alunos-list'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (permissions.IsAdminUser,)
    
    

class AlunoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'aluno-detail'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (permissions.IsAdminUser,)
    


class SalaList(generics.ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'salas-list'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (IsProfessorOrReadOnly, )
    

class SalaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'sala-detail'
    permission_classes = (IsProfessorOrReadOnly,)
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    


class AtividadeList(generics.ListCreateAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividades-list'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (IsProfessorOrReadOnly, )
    
    

class AtividadeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividade-detail'
    throttle_classes = (AnonRateThrottle, UserRateThrottle)
    permission_classes = (IsProfessorOrReadOnly,)
    


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = 'user-list'
    permission_classes = (permissions.IsAdminUser,)
    


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = 'user-detail'
    permission_classes = (permissions.IsAdminUser,)
    


class ApiRoot(generics.GenericAPIView):
    name='classroom'
    def get(self, request, *args, **kwargs):
        return Response({
            'professores': reverse(ProfessorList.name, request=request),
            'alunos': reverse(AlunoList.name, request=request),
            'salas': reverse(SalaList.name, request=request),
            'atividades': reverse(AtividadeList.name, request=request),
            'users': reverse(UserList.name, request = request),
        })