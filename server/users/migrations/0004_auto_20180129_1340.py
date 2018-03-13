# Generated by Django 2.0.1 on 2018-01-29 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20180127_1305'),
    ]

    operations = [
        migrations.AddField(
            model_name='get_notified',
            name='appCodeName',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='appName',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='height',
            field=models.IntegerField(default=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='language',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='platform',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='vendor',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='get_notified',
            name='width',
            field=models.IntegerField(default=0, null=True),
        ),
    ]