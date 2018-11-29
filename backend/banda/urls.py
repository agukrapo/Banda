from django.conf.urls import url
from banda import views

urlpatterns = [
    url(r'^fondos/$', views.get_fondos),
    url(r'^musica/$', views.get_musica),
    url(r'^videos/$', views.get_videos),
    url(r'^nosotros/$', views.get_nosotros),
    url(r'^presentaciones/$', views.get_presentaciones),
    url(r'^muro/$', views.get_muro),
    url(r'^comentario/$', views.save_comentario),
    url(r'^fotos/$', views.get_fotos),
    url(r'^contacto/$', views.get_contacto),
    url(r'^secciones/$', views.get_secciones),
    url(r'^galeria/$', views.get_galeria),
]
