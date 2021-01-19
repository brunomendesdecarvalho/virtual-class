from rest_framework import permissions


class PermissaoAcesso(permissions.BasePermission):
    def tem_permissao(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return obj.criador == request.user