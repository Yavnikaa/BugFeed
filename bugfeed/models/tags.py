from django.db import models

class Tags(models.Model):
    tag_value = models.CharField(max_length=30)
    
    def __str__(self):
        return self.tag_value




