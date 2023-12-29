# Generated by Django 5.0 on 2023-12-05 16:48

import user_app.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default=None, max_length=12, unique=True, validators=[user_app.validators.validate_username]),
        ),
    ]