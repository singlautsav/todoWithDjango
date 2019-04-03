from django.db import models
from django.utils import timezone
import datetime    

class Todo(models.Model):
    # title = models.CharField(max_length=120)
    task = models.TextField()
    
    timeTaskl = models.TimeField(null=True, blank=False)

    dateEvent = models.DateField(default=timezone.now().strftime("%Y-%m-%d"))

    completed =models.BooleanField(null=True, blank=False, default=False)

    # completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
