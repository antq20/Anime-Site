# Generated by Django 5.0 on 2023-12-05 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default=None, max_length=12, unique=True),
        ),
    ]
