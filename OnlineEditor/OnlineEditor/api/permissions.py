from rest_framework import permissions
from .models import Files

class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        file = Files.objects.filter(id=pk).first()
        if file.created_by == request.user:
            return True
        else:
            return False
