from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import Files, FilesSerializer
from .permissions import IsOwner

# Create your views here.
class ListCreateFiles(generics.ListCreateAPIView):
    serializer_class = FilesSerializer
    queryset = Files.objects.all()
    permission_classes = [IsAuthenticated]

class ViewUpdateDeleteFiles(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FilesSerializer
    queryset = Files.objects.all()
    lookup_field = 'pk'
    permission_classes = [IsOwner]
