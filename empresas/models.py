from django.db import models
# Create your models here.
class Empresa(models.Model):
    nombre = models.CharField(max_length=70, blank=False, default='')
    direccion = models.CharField(max_length=70, blank=False, default='')
    nit = models.CharField(max_length=70, blank=False, default='')
    telefono = models.CharField(max_length=70, blank=False, default='')    



