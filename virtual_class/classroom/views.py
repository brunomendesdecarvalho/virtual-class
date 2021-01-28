from django.shortcuts import render

# Create your views here.
from rest_framework import status, generics
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
    permission_classes = (permissions.IsAdminUser | IsProfessorOrReadOnly,)



class ProfessorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    name = 'professor-detail'
    throttle_scope = 'professor'
    permission_classes = (permissions.IsAdminUser,)
    


class AlunoList(generics.ListCreateAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'alunos-list'
    permission_classes = (permissions.IsAdminUser | IsProfessorOrReadOnly,)
    
    

class AlunoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    name = 'aluno-detail'
    throttle_scope = 'aluno'
    permission_classes = (permissions.IsAdminUser,)
    


class SalaList(generics.ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'salas-list'
    permission_classes = (IsProfessorOrReadOnly, )
    

class SalaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    name = 'sala-detail'
    throttle_scope = 'sala'
    permission_classes = (IsProfessorOrReadOnly | permissions.IsAdminUser,)


class AtividadeList(generics.ListCreateAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividades-list'
    permission_classes = (IsProfessorOrReadOnly, )
    
    

class AtividadeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    name = 'atividade-detail'
    throttle_scope = 'atividade'
    permission_classes = (IsProfessorOrReadOnly | permissions.IsAdminUser,)
    


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
    permissions_classes = (permissions.IsAuthenticatedOrReadOnly,)
    name='classroom'
    def get(self, request, *args, **kwargs):
        return Response({
            'professores': reverse(ProfessorList.name, request=request),
            'alunos': reverse(AlunoList.name, request=request),
            'salas': reverse(SalaList.name, request=request),
            'atividades': reverse(AtividadeList.name, request=request),
            'users': reverse(UserList.name, request = request),
        })