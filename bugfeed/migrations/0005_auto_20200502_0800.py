# Generated by Django 3.0.5 on 2020-05-02 08:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bugfeed', '0004_auto_20200429_0607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to='bugfeed.Users'),
        ),
        migrations.AlterField(
            model_name='team',
            name='project_members',
            field=models.ManyToManyField(related_name='team_member_related', related_query_name='team_member', to='bugfeed.Users'),
        ),
    ]