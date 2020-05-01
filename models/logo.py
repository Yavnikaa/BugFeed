from django.db import models
from bugfeed.models.projects import Projects

class Logo_ideas:
    logo = models.ImageField(upload_to='assignment/media/', height_field=130, width_field=130)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)                  
