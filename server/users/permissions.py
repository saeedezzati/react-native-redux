from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow staff to edit user.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the host of the game.
        return request.user.is_superuser



class IsSelfOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow self to edit user.
    """
    message = 'user is not the self of this account'
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the host of the game.
        return ((obj.pk == request.user.pk) | request.user.is_superuser)

