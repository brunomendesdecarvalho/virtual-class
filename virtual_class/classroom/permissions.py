from rest_framework import permissions


# class PermissaoAcesso(permissions.BasePermission):
#     def tem_permissao(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         else:
#             return obj.criador == request.user


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return True


class IsProfessorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in permissions.SAFE_METHODS or request.user and request.user.is_authenticated and request.user.usu_eh_professor)


class IsProfessorOrAluno(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.usu_eh_professor or (request.user.usu_eh_aluno and request.method in permissions.SAFE_METHODS)))