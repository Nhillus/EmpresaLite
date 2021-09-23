# EmpresaLite
#Requerimientos:
Django==3.2.7 
PyMySQL 1.4.6 
djangorestframework 3.12.4 
django-cors-headers 3.8.0 
React 
React-boostrap
MariaDB 10.4 
npm 7.20.3 16.7.0

Para iniciar este proy back en la carpeta \empresalite en los setting.py tenemos la base de datos con el nombre "empresa", por lo que debemos crearla en nuestro manejador 
de base de datos con dicho nombre "empresa" o cambiarlo en su defecto. Luego ejecutar el comando

python manage.py migrate

Despues debes crear el super usuario, para poder entrar a la parte de admin del backend, colocas tu username, correo y contraseña.

python manage.py createsuperuser

por ultimo hacer python manage.py runserver y asi corres el proy en la ruta http://localhost:8000/

para el frontend:

En la carpeta raiz \frontempresa ejecutar el comando

npm intall para instalar todas las dependecias. 

luego para correrlo el cmd

ng serve y asi correra en la ruta por defecto http://localhost:3000/
