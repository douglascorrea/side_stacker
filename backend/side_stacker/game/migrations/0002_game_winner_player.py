# Generated by Django 4.2.3 on 2023-07-13 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='winner_player',
            field=models.CharField(max_length=1, null=True),
        ),
    ]
