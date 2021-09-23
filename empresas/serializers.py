from rest_framework import serializers 
from empresas.models import Empresa
 
class EmpresaSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Empresa
        fields = ('id',
                  'nombre',
                  'direccion',
                  'nit',
                  'telefono'
                  )