# Generated by Django 3.0.6 on 2020-06-19 07:54

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import djrichtextfield.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('display_picture', models.ImageField(null=True, upload_to='assignment/media/')),
                ('userId', models.BigIntegerField(unique=True)),
                ('name', models.CharField(max_length=180)),
                ('is_master', models.BooleanField(default=True)),
                ('enrol_number', models.IntegerField(unique=True)),
                ('branch_name', models.CharField(max_length=80)),
                ('current_year', models.PositiveSmallIntegerField()),
                ('degree_name', models.CharField(max_length=80)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=35)),
                ('project_wiki', djrichtextfield.models.RichTextField()),
                ('project_date', models.DateTimeField(editable=False)),
                ('project_link', models.URLField(default='')),
                ('priority_value', models.CharField(choices=[('HIGH', 'High'), ('MODERATE', 'Moderate'), ('LOW', 'Low'), ('RELEASED', 'Released')], default='MODERATE', max_length=10)),
                ('updated_date', models.DateTimeField(editable=False, null=True)),
                ('created_by', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['project_date'],
            },
        ),
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_value', models.CharField(choices=[('ENHANCEMENT', 'Enhancement'), ('BUG', 'Bug'), ('UI/UX', 'Ui/Ux'), ('DUPLICATE', 'Duplicate'), ('OTHERS', 'Others')], default='BUG', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_members', models.ManyToManyField(related_name='team_member_related', related_query_name='team_member', to=settings.AUTH_USER_MODEL)),
                ('project_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugfeed.Projects')),
            ],
        ),
        migrations.CreateModel(
            name='Project_bugs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bug_heading', models.CharField(max_length=30)),
                ('bug_description', djrichtextfield.models.RichTextField(blank=True)),
                ('other_text', models.CharField(blank=True, max_length=20)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('RESOLVED', 'Resolved'), ('TO_BE_DISCUSSED', 'To Be Discussed')], default='RESOLVED', max_length=25)),
                ('timestamp', models.DateTimeField()),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='bugfeed.Team')),
                ('category', models.ManyToManyField(to='bugfeed.Tags')),
                ('project_bug', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugfeed.Projects')),
                ('reported_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['timestamp'],
            },
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('likes_count', models.PositiveSmallIntegerField()),
                ('bug_like', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugfeed.Project_bugs')),
                ('liked_by', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.TextField()),
                ('comment_time', models.DateTimeField()),
                ('bug_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugfeed.Project_bugs')),
                ('comment_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
