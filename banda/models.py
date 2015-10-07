import datetime
from django.template.defaultfilters import date as _date
from django.db import models
from singleton_models.models import SingletonModel
from django.utils.http import urlquote
from django.conf import settings
from pytz import timezone
from sorl.thumbnail import ImageField
from sorl.thumbnail.shortcuts import get_thumbnail

DATE_FORMAT = "d \d\e F \d\e Y"
TIME_FORMAT = "%H:%M hs."
DATETIME_FORMAT = "d \d\e F \d\e Y, H:i \h\s."


def date_to_string(date):
    if isinstance(date, datetime.date):
        return _date(date, DATE_FORMAT)


def datetime_to_string(date):
    if isinstance(date, datetime.datetime):
        return _date(date.astimezone(timezone(settings.TIME_ZONE)), DATETIME_FORMAT)


def time_to_string(time):
    if isinstance(time, datetime.time):
        return time.strftime(TIME_FORMAT)


class Cancion(models.Model):
    nombre = models.CharField(max_length=100)
    url = models.URLField(blank=True, help_text='Soundcloud')

    def __unicode__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Canciones"

    def serialize(self):
        return {
            'nombre': self.nombre,
            'url': urlquote(self.url),
        }


class Album(models.Model):
    nombre = models.CharField(max_length=100)
    artista = models.CharField(max_length=100, blank=True)
    lanzamiento = models.DateField(blank=True)
    tapa = models.ImageField(upload_to='img/tapas')
    descripcion = models.TextField(max_length=1000, blank=True)
    canciones = models.ManyToManyField(Cancion)

    def __unicode__(self):
        return self.nombre

    class Meta:
        ordering = ('-lanzamiento',)

    def serialize(self):
        return {
            'artista': self.artista,
            'nombre': self.nombre,
            'lanzamiento': date_to_string(self.lanzamiento),
            'tapa': self.tapa.url,
            'canciones': self.canciones.all(),
            'descripcion': self.descripcion,
            'thumbnail': get_thumbnail(self.tapa, '480x360', crop='center', quality=80).url,
        }


class Presentacion(models.Model):
    lugar = models.CharField(max_length=500)
    direccion = models.CharField(max_length=500)
    descripcion = models.TextField(max_length=1000, blank=True)
    fecha = models.DateField()
    hora = models.TimeField()

    def __unicode__(self):
        return self.lugar + ' - ' + date_to_string(self.fecha) + ', ' + time_to_string(self.hora)

    class Meta:
        ordering = ('fecha',)
        verbose_name_plural = "Presentaciones"

    def serialize(self):
        return {
            'lugar': self.lugar,
            'direccion': self.direccion,
            'descripcion': self.descripcion,
            'fecha': date_to_string(self.fecha),
            'hora': time_to_string(self.hora),
        }


class Imagen(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = ImageField(upload_to='img/%Y/%m/%d')
    fecha = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.nombre + ' - ' + datetime_to_string(self.fecha)

    class Meta:
        ordering = ('-fecha',)
        verbose_name_plural = "Imagenes"

    def serialize(self):
        return {
            'fecha': datetime_to_string(self.fecha),
            'url': self.imagen.url,
            'width': self.imagen.width,
            'height': self.imagen.height,
            'thumbnail': get_thumbnail(self.imagen, '253x200', crop='center', quality=80).url,
            'nombre': self.nombre,
        }


class Galeria(models.Model):
    FOTOS = 'FOTOS'
    ARTE_DE_TAPA = 'ARTE_DE_TAPA'

    NOMBRES = (
        (FOTOS, 'Fotos'),
        (ARTE_DE_TAPA, 'Arte de Tapa'),
    )

    nombre = models.CharField(max_length=100, choices=NOMBRES, unique=True)
    imagenes = models.ManyToManyField(Imagen)


class Fondos(SingletonModel):
    logo = models.ImageField(upload_to='img/fondos', blank=True)
    inicio = models.ImageField(upload_to='img/fondos', blank=True)
    nosotros = models.ImageField(upload_to='img/fondos', blank=True)
    musica = models.ImageField(upload_to='img/fondos', blank=True)
    videos = models.ImageField(upload_to='img/fondos', blank=True)
    fotos = models.ImageField(upload_to='img/fondos', blank=True)
    muro = models.ImageField(upload_to='img/fondos', blank=True)
    presentaciones = models.ImageField(upload_to='img/fondos', blank=True)
    contacto = models.ImageField(upload_to='img/fondos', blank=True)

    class Meta:
        verbose_name = "Fondos"
        verbose_name_plural = "Fondos"

    def serialize(self):
        return {
            'logo': self.logo.url if self.logo else None,
            'inicio': self.inicio.url if self.inicio else None,
            'nosotros': self.nosotros.url if self.nosotros else None,
            'musica': self.musica.url if self.musica else None,
            'videos': self.videos.url if self.videos else None,
            'fotos': self.fotos.url if self.fotos else None,
            'muro': self.muro.url if self.muro else None,
            'presentaciones': self.presentaciones.url if self.presentaciones else None,
            'contacto': self.contacto.url if self.contacto else None,
        }


class Secciones(SingletonModel):
    inicio_habilitado = models.BooleanField(default=True)
    inicio_label = models.CharField(max_length=100, default='inicio')
    nosotros_habilitado = models.BooleanField(default=False)
    nosotros_label = models.CharField(max_length=100, default='nosotros')
    musica_habilitado = models.BooleanField(default=False)
    musica_label = models.CharField(max_length=100, default='musica')
    videos_habilitado = models.BooleanField(default=False)
    videos_label = models.CharField(max_length=100, default='videos')
    fotos_habilitado = models.BooleanField(default=False)
    fotos_label = models.CharField(max_length=100, default='fotos')
    muro_habilitado = models.BooleanField(default=False)
    muro_label = models.CharField(max_length=100, default='muro')
    presentaciones_habilitado = models.BooleanField(default=False)
    presentaciones_label = models.CharField(max_length=100, default='presentaciones')
    contacto_habilitado = models.BooleanField(default=False)
    contacto_label = models.CharField(max_length=100, default='contacto')

    class Meta:
        verbose_name = "Secciones"
        verbose_name_plural = "Secciones"

    def serialize(self):
        return {
            'inicio': self.inicio_habilitado,
            'inicioLabel': self.inicio_label,
            'nosotros': self.nosotros_habilitado,
            'nosotrosLabel': self.nosotros_label,
            'musica': self.musica_habilitado,
            'musicaLabel': self.musica_label,
            'videos': self.videos_habilitado,
            'videosLabel': self.videos_label,
            'fotos': self.fotos_habilitado,
            'fotosLabel': self.fotos_label,
            'muro': self.muro_habilitado,
            'muroLabel': self.muro_label,
            'presentaciones': self.presentaciones_habilitado,
            'presentacionesLabel': self.presentaciones_label,
            'contacto': self.contacto_habilitado,
            'contactoLabel': self.contacto_label,
        }


class Nosotros(SingletonModel):
    texto = models.TextField(max_length=900000)

    def __unicode__(self):
        return u"Nosotros"

    class Meta:
        verbose_name = "Nosotros"
        verbose_name_plural = "Nosotros"

    def serialize(self):
        return {
            'texto': self.texto,
        }


class Video(models.Model):
    nombre = models.CharField(max_length=100)
    url = models.URLField(help_text='solamente youtube')
    fecha = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.nombre

    class Meta:
        ordering = ('-fecha',)

    def serialize(self):
        return {
            'nombre': self.nombre,
            'url': self.url,
        }


class Comentario(models.Model):
    autor = models.CharField(max_length=100)
    texto = models.TextField(max_length=2000)
    fecha = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.autor + ' - ' + datetime_to_string(self.fecha)

    class Meta:
        ordering = ('-fecha',)
        unique_together = ("autor", "texto")

    def serialize(self):
        return {
            'autor': self.autor,
            'texto': self.texto,
            'fecha': datetime_to_string(self.fecha),
        }


class Contacto(SingletonModel):
    texto = models.TextField(max_length=900000)

    def __unicode__(self):
        return u"Contacto"

    class Meta:
        verbose_name = "Contacto"
        verbose_name_plural = "Contacto"

    def serialize(self):
        return {
            'texto': self.texto,
        }
