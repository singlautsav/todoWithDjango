# Generated by Django 2.2 on 2019-04-02 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='timeTask',
            field=models.TimeField(),
        ),
    ]
