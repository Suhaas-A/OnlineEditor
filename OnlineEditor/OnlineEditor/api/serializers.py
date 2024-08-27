from rest_framework import serializers
from .models import Files

class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ('__all__')
        extra_kwargs = {'content': {'trim_whitespace': False}}