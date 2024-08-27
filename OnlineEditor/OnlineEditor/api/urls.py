from django.urls import path

from .views import ListCreateFiles, ViewUpdateDeleteFiles

urlpatterns = [
    path('list_create_files/', ListCreateFiles.as_view(), name='list_create_files'),
    path('view_update_delete_files/<int:pk>', ViewUpdateDeleteFiles.as_view(), name='view_update_delete_files')
]