# Generated by Django 5.0 on 2023-12-05 18:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0005_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=12, unique=True, validators=[django.core.validators.RegexValidator('^[\\w]+$', 'Invalid format')]),
        ),
    ]
