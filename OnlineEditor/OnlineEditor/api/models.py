from django.db import models
from authorisation.models import Users

# Create your models here.
class Files(models.Model):
    name = models.TextField(unique=True, null=False)
    date_of_creation = models.DateTimeField(null=False, auto_now_add=True)
    content = models.TextField(default=None, null=True)
    styles = models.JSONField(default={'fontSize': 22, 'textDecorationLine': 'initial', 'fontStyle': 'initial', 'fontWeight': 'initial'}, null=False)
    created_by = models.ForeignKey(Users, null=True, on_delete=models.CASCADE, to_field='username')
