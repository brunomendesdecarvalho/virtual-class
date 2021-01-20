from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class ProfessorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Professor
        fields = ('url', 'nome', 'idade')


class AlunoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aluno
        fields = ('url', 'nome', 'idade', 'semestre', 'curso')


class SalaSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source = 'owner.username')
    professor = serializers.SlugRelatedField(queryset=Professor.objects.all(), slug_field='nome')
    alunos = serializers.SlugRelatedField(many = True, queryset=Aluno.objects.all(), slug_field='nome')

    class Meta:
        model = Sala
        fields = ('url', 'owner', 'disciplina', 'professor', 'alunos')


class AtividadeSerializer(serializers.HyperlinkedModelSerializer):
    sala = serializers.SlugRelatedField(queryset=Sala.objects.all(), slug_field='disciplina')

    class Meta:
        model = Atividade
        fields = ('url', 'sala', 'titulo', 'descricao', 'data_criado', 'data_entrega')


class UserSalaSerializer(serializers.HyperlinkedModelSerializer):


    class Meta:
        model = Sala
        fields = ('url', 'disciplina')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    salas = UserSalaSerializer(many = True, read_only = True)


    class Meta:
        model = User
        fields = ('url', 'pk', 'username', 'salas')