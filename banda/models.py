import datetime
from django.template.defaultfilters import date as _date
from django.db import models
from singleton_models.models import SingletonModel
from django.utils.http import urlquote
from django.conf import settings
from pytz import timezone # pip install pytz
from sorl.thumbnail import ImageField
from sorl.thumbnail.shortcuts import get_thumbnail

DATE_FORMAT = "d \d\e F \d\e Y"
TIME_FORMAT = "%H:%M hs."
DATETIME_FORMAT = "d \d\e F \d\e Y, H:i \h\s."

def dateToString(date):
    if isinstance(date, datetime.date):
        return _date(date, DATE_FORMAT)

def datetimeToString(date):
    if isinstance(date, datetime.datetime):
        return _date(date.astimezone(timezone(settings.TIME_ZONE)), DATETIME_FORMAT)

def timeToString(time):
    if isinstance(time, datetime.time):
        return time.strftime(TIME_FORMAT)

class Cancion(models.Model):
    nombre = models.CharField(max_length=100)
    url = models.URLField(blank=True, help_text='Soundcloud')
    #duracion = models.TimeField()

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
            'lanzamiento': dateToString(self.lanzamiento),
            'tapa': self.tapa.url,
            'canciones': self.canciones.all(),
            'descripcion': self.descripcion,
        }

class Presentacion(models.Model):
    lugar = models.CharField(max_length=500)
    direccion = models.CharField(max_length=500)
    descripcion = models.TextField(max_length=1000, blank=True)
    fecha = models.DateField()
    hora = models.TimeField()

    def __unicode__(self):
        return self.lugar + ' - ' + dateToString(self.fecha) + ', ' + timeToString(self.hora)

    class Meta:
        ordering = ('fecha',)
        verbose_name_plural = "Presentaciones"

    def serialize(self):
        return {
            'lugar': self.lugar,
            'direccion': self.direccion,
            'descripcion': self.descripcion,
            'fecha': dateToString(self.fecha),
            'hora': timeToString(self.hora),
        }

class Foto(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = ImageField(upload_to='img/%Y/%m/%d')
    fecha = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.nombre + ' - ' + datetimeToString(self.fecha)

    class Meta:
        ordering = ('-fecha',)

    def serialize(self):
        return {
            'fecha': datetimeToString(self.fecha),
            'url': self.imagen.url,
            'width': self.imagen.width,
            'height': self.imagen.height,
            'thumbnail': get_thumbnail(self.imagen, '253x200', crop='center', quality=99).url,
            'nombre': self.nombre,
        }

class Fondos(SingletonModel):
    logo = models.ImageField(upload_to='img/fondos')
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
            'logo': self.logo.url,
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
    nosotros_habilitado = models.BooleanField(default=False)
    musica_habilitado = models.BooleanField(default=False)
    videos_habilitado = models.BooleanField(default=False)
    fotos_habilitado = models.BooleanField(default=False)
    muro_habilitado = models.BooleanField(default=False)
    presentaciones_habilitado = models.BooleanField(default=False)
    contacto_habilitado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Secciones"
        verbose_name_plural = "Secciones"

    def serialize(self):
        return {
            'inicio': self.inicio_habilitado,
            'nosotros': self.nosotros_habilitado,
            'musica': self.musica_habilitado,
            'videos': self.videos_habilitado,
            'fotos': self.fotos_habilitado,
            'muro': self.muro_habilitado,
            'presentaciones': self.presentaciones_habilitado,
            'contacto': self.contacto_habilitado,
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
        return self.autor + ' - ' + datetimeToString(self.fecha)

    class Meta:
        ordering = ('-fecha',)
        unique_together = ("autor", "texto")

    def serialize(self):
        return {
            'autor': self.autor,
            'texto': self.texto,
            'fecha': datetimeToString(self.fecha),
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
