# Generated by Django 5.0 on 2023-12-06 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_app', '0002_alter_anime_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=None, max_digits=3),
        ),
    ]
