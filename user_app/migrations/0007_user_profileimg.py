# Generated by Django 5.0 on 2023-12-18 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0006_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profileImg',
            field=models.CharField(blank=True, default='https://w0.peakpx.com/wallpaper/784/45/HD-wallpaper-satoru-gojo-gambar-gambar-anime-funny-gojo-thumbnail.jpg'),
        ),
    ]
