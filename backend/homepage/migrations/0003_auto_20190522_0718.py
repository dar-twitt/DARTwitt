# Generated by Django 2.2.1 on 2019-05-22 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0002_auto_20190522_0608'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='follow',
            options={'verbose_name': 'Follow', 'verbose_name_plural': 'Follows'},
        ),
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.CharField(default=None, max_length=500, null=True),
        ),
    ]