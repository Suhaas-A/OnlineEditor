# Generated by Django 5.0.4 on 2024-08-25 04:26

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True)),
                ('date_of_creation', models.DateTimeField(default=datetime.datetime(2024, 8, 25, 9, 56, 51, 683280))),
                ('content', models.TextField(default=None, null=True)),
                ('styles', models.JSONField(default={'fontSize': 22, 'fontStyle': 'initial', 'fontWeight': 'initial', 'height': '700px', 'textDecorationLine': 'initial', 'width': '100%'})),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
    ]
