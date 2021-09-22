from django.db import models
# Create your models here.
class Empresa(models.Model):
    Nombre_de_la_empresa = models.CharField(max_length=70, blank=False, default='')
    Dirección = models.CharField(max_length=70, blank=False, default='')
    NIT = models.CharField(max_length=70, blank=False, default='')
    Teléfono = models.CharField(max_length=70, blank=False, default='')    



