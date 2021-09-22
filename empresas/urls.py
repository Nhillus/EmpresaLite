from django.conf.urls import url 
from empresas import views 
 
urlpatterns = [ 
    url(r'^api/empresas/$', views.empresa_list),
    url(r'^api/empresas/(?P<id>[0-9]+)$', views.empresa_detail)
]