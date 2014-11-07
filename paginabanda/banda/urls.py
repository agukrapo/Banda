from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^fondos/$', 'banda.views.get_fondos'),
    url(r'^musica/$', 'banda.views.get_musica'),
    url(r'^videos/$', 'banda.views.get_videos'),
    url(r'^nosotros/$', 'banda.views.get_nosotros'),
    url(r'^presentaciones/$', 'banda.views.get_presentaciones'),
    url(r'^muro/$', 'banda.views.get_muro'),
    url(r'^comentario/$', 'banda.views.save_comentario'),
    url(r'^fotos/$', 'banda.views.get_fotos'),
    url(r'^contacto/$', 'banda.views.get_contacto'),
    url(r'^secciones/$', 'banda.views.get_secciones'),
)
