from django.db import models
from django.utils import timezone
    

class Todo(models.Model):
    # title = models.CharField(max_length=120)
    task = models.TextField()
    
    timeTaskl = models.TimeField()

    # completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
