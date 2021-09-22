from django.shortcuts import render 
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from empresas.models import Empresa
from empresas.serializers import EmpresaSerializer

from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['GET', 'POST'])
def empresa_list(request):
    if request.method == 'GET':
        try:
          empresas = Empresa.objects.all()
          empresas_serializer = EmpresaSerializer(empresas, many=True)

          response = {
             'mensaje': "empresas obtenidos exitosamente",
             'empresas': empresas_serializer.data,
             'error': ""
          }
          return JsonResponse(response, status=status.HTTP_200_OK);
        except: 
          error = {
            'message': "Fail! -> no se han podido obtener intentelo mas tarde",
            'empresas': "[]",
            'error': "Error"
          }
          return JsonResponse(error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
    elif request.method == 'POST':
        try:
            empresa_data = JSONParser().parse(request)
            empresa_serializer = EmpresaSerializer(data=empresa_data)
            
            if empresa_serializer.is_valid():
                empresa_serializer.save()
                print(empresa_serializer.data)
                response = {
                   'message': "creado con exito nueva empresa con id = %d" % empresa_serializer.data.get('id'),
                   'empresas': [empresa_serializer.data],
                   'error': "" 
                }
                return JsonResponse(response, status=status.HTTP_201_CREATED)
            else:
                error = {
                    'message':"no se pudo crear!",
                    'empresas':"[]",
                    'error': empresa_serializer.errors
                }
                return JsonResponse(error, status=status.HTTP_400_BAD_REQUEST)
        except: 
            exceptionError = {
                    'message': "no se pudo crear!",
                    'empresas': "[]",
                    'error': "exception!"
                }
            return JsonResponse(exceptionError, status=status.HTTP_500_INTERNAL_SERVER_ERROR);

@csrf_exempt 
@api_view(['PUT', 'DELETE'])
def empresa_detail(request, id):
    try: 
        empresa = Empresa.objects.get(id=id)
    except Empresa.DoesNotExist:
        exceptionError = {
            'message': "no se pudo encontrar un empresa con ese id = %s!" %id,
            'empresas': "[]",
            'error': "404 Code - Not Found!"
        }
        return JsonResponse(exceptionError, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'PUT':
        try:
            empresa_data = JSONParser().parse(request)
            empresa_serializer = EmpresaSerializer(empresa, data=empresa_data)

            if empresa_serializer.is_valid(): 
                empresa_serializer.save()
                response = {
                    'message': "actualizado la empresa id = %s" %id,
                    'empresas': [empresa_serializer.data],
                    'error': ""
                }                
                return JsonResponse(response) 

            response = {
                    'message': "fallado actualizado la empresa id = %s" %id,
                    'empresas': [empresa_serializer.data],
                    'error': empresa_serializer.errors
                }
            return JsonResponse(response, status=status.HTTP_400_BAD_REQUEST) 
        except:
            exceptionError = {
                'message': "fallo al actualizar la empresa id = %s!" %id,
                'empresas': [empresa_serializer.data],
                'error': "Internal Error!"
            }
            return JsonResponse(exceptionError, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
 
    elif request.method == 'DELETE':
        print("borrando la empresa con id=%s"%id)
        empresa.delete() 
        empresa_serializer = EmpresaSerializer(empresa) 
        response = {
                'message': "borrado exitosamnete la empresa con  id = %s" %id,
                'empresas': [empresa_serializer.data],
                'error': ""
            }
        return JsonResponse(response)
