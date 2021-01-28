from rest_framework import permissions


class IsProfessorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in permissions.SAFE_METHODS or request.user and request.user.is_authenticated and request.user.usu_eh_professor)


class IsProfessorOrAluno(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.usu_eh_professor or (request.user.usu_eh_aluno and request.method in permissions.SAFE_METHODS)))