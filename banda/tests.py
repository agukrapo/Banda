import mock

from django.test import TestCase, Client

from banda.models import Secciones, Fondos, Album, Cancion, Video, Nosotros, Presentacion, Comentario, Imagen, Galeria, Contacto

from paginabanda import settings

from datetime import datetime

from django.core.files.uploadedfile import SimpleUploadedFile

from os.path import exists


def faketoday():
    return datetime(2012, 11, 3)


class FakeDatetime(datetime):
    @classmethod
    def now(cls):
        return faketoday()


class BaseTestCase(TestCase):
    def setUp(self):
        self.client = Client(HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        Secciones.objects.create(inicio_habilitado=True,
                                 nosotros_habilitado=True,
                                 musica_habilitado=True,
                                 videos_habilitado=True,
                                 fotos_habilitado=True,
                                 muro_habilitado=True,
                                 presentaciones_habilitado=True,
                                 contacto_habilitado=True)


class FondosTestCase(BaseTestCase):
    def setUp(self):
        super(FondosTestCase, self).setUp()

        Fondos.objects.create(logo='img/fondos/logo',
                              inicio='img/fondos/inicio',
                              nosotros='img/fondos/nosotros',
                              musica='img/fondos/musica',
                              videos='img/fondos/videos',
                              fotos='img/fondos/fotos',
                              muro='img/fondos/muro',
                              presentaciones='img/fondos/presentaciones',
                              contacto='img/fondos/contacto')

    def test_fondos(self):
        response = self.client.get('/banda/fondos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"nosotros": "/media/img/fondos/nosotros", "musica": "/media/img/fondos/musica", "contacto": "/media/img/fondos/contacto", "videos": "/media/img/fondos/videos", "inicio": "/media/img/fondos/inicio", "logo": "/media/img/fondos/logo", "fotos": "/media/img/fondos/fotos", "muro": "/media/img/fondos/muro", "presentaciones": "/media/img/fondos/presentaciones"}')


class EmptyFondosTestCase(BaseTestCase):
    def setUp(self):
        super(EmptyFondosTestCase, self).setUp()

    def test_fondos(self):
        response = self.client.get('/banda/fondos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{}')


class SeccionesTestCase(BaseTestCase):
    def setUp(self):
        super(SeccionesTestCase, self).setUp()

    def test_secciones(self):
        response = self.client.get('/banda/secciones/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"contactoLabel": "contacto", "videosLabel": "videos", "fotosLabel": "fotos", "fotos": true, "contacto": true, "videos": true, "muro": true, "presentacionesLabel": "presentaciones", "muroLabel": "muro", "nosotrosLabel": "nosotros", "inicioLabel": "inicio", "nosotros": true, "musica": true, "inicio": true, "presentaciones": true, "musicaLabel": "musica"}')


class EmptySeccionesTestCase(TestCase):
    def test_secciones(self):
        self.client = Client(HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        response = self.client.get('/banda/secciones/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{}')


class MusicaTestCase(BaseTestCase):
    def setUp(self):
        super(MusicaTestCase, self).setUp()

        cancion = Cancion.objects.create(nombre = 'cancion field')

        album = Album(nombre='descripcion field',
                      artista='descripcion field',
                      lanzamiento='2015-04-13',
                      tapa='img/tapas/tapa.png',
                      descripcion='descripcion field')
        album.save()
        album.canciones.add(cancion)
        album.save()

    def test_musica(self):
        response = self.client.get('/banda/musica/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"current": 1, "total": 1, "elements": [{"artista": "descripcion field", "canciones": [{"url": "", "nombre": "cancion field"}], "tapa": "/media/img/tapas/tapa.png", "lanzamiento": "13 de Abril de 2015", "descripcion": "descripcion field", "nombre": "descripcion field", "thumbnail": "/media/cache/1c/79/1c79f75c3cfc37be037a2e4159f394b2.jpg"}]}')


class VideosTestCase(BaseTestCase):
    def setUp(self):
        super(VideosTestCase, self).setUp()

        Video.objects.create(nombre='nombre field', url='url field', fecha='2015/05/14')

    def test_fondos(self):
        response = self.client.get('/banda/videos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"current": 1, "total": 1, "elements": [{"url": "url field", "nombre": "nombre field"}]}')


class NosotrosTestCase(BaseTestCase):
    def setUp(self):
        super(NosotrosTestCase, self).setUp()

        Nosotros.objects.create(texto='texto field')

    def test_fondos(self):
        response = self.client.get('/banda/nosotros/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"texto": "texto field"}')


class PresentacionesTestCase(BaseTestCase):
    def setUp(self):
        super(PresentacionesTestCase, self).setUp()

        Presentacion.objects.create(lugar='lugar 1 field',
                                    direccion='direccion 1 field',
                                    descripcion='descripcion 1 field',
                                    fecha='2010-03-16',
                                    hora='13:15')

        Presentacion.objects.create(lugar='lugar 2 field',
                                    direccion='direccion 2 field',
                                    descripcion='descripcion 2 field',
                                    fecha='2012-12-24',
                                    hora='23:59')

    @mock.patch('banda.views.timezone.now', faketoday)
    def test_presentaciones(self):
        response = self.client.get('/banda/presentaciones/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '[{"lugar": "lugar 2 field", "descripcion": "descripcion 2 field", "fecha": "24 de Diciembre de 2012", "hora": "23:59 hs.", "direccion": "direccion 2 field"}]')


class MuroTestCase(BaseTestCase):

    @mock.patch('django.db.models.fields.timezone.now', faketoday)
    def setUp(self):
        super(MuroTestCase, self).setUp()
        Comentario.objects.create(autor='autor field', texto='texto field')

    def test_(self):
        response = self.client.get('/banda/muro/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"current": 1, "total": 1, "elements": [{"autor": "autor field", "fecha": "03 de Noviembre de 2012, 00:00 hs.", "texto": "texto field"}]}')


class ComentarioTestCase(BaseTestCase):
    def setUp(self):
        super(ComentarioTestCase, self).setUp()

    def test_(self):
        response = self.client.post('/banda/comentario/', '{"autor": "autor field", "comentario": "comentario field"}', content_type="application/json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.content, 'Comentario procesado correctamente')


class FotosTestCase(BaseTestCase):
    @mock.patch('django.db.models.fields.timezone.now', faketoday)
    @mock.patch('django.db.models.fields.files.datetime.datetime', FakeDatetime)
    def setUp(self):
        super(FotosTestCase, self).setUp()
        imagen = Imagen.objects.create(nombre='nombre field',
                                       imagen=SimpleUploadedFile(name='foo.gif', content=b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'))

        galeria = Galeria.objects.create(nombre=Galeria.FOTOS)
        galeria.imagenes.add(imagen)

    def test_fotos(self):
        response = self.client.get('/banda/fotos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"current": 1, "total": 1, "elements": [{"url": "/media/img/2012/11/03/foo.gif", "fecha": "03 de Noviembre de 2012, 00:00 hs.", "height": 1, "width": 1, "nombre": "nombre field", "thumbnail": "/media/cache/da/68/da68810b27df3a03ee90de82aab8e8e1.jpg"}]}')

    @classmethod
    def tearDownClass(cls):
        if exists(settings.MEDIA_ROOT):
            import shutil
            shutil.rmtree(settings.MEDIA_ROOT)

        super(FotosTestCase, cls).tearDownClass()


class GaleriaTestCase(BaseTestCase):
    @mock.patch('django.db.models.fields.timezone.now', faketoday)
    @mock.patch('django.db.models.fields.files.datetime.datetime', FakeDatetime)
    def setUp(self):
        super(GaleriaTestCase, self).setUp()
        imagen = Imagen.objects.create(nombre='nombre de imagen',
                                       imagen=SimpleUploadedFile(name='imagen.gif', content=b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'))

        galeria = Galeria.objects.create(nombre='custom')
        galeria.imagenes.add(imagen)

    def test_(self):
        response = self.client.get('/banda/galeria/', {'nombre': 'custom'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"current": 1, "total": 1, "elements": [{"url": "/media/img/2012/11/03/imagen.gif", "fecha": "03 de Noviembre de 2012, 00:00 hs.", "height": 1, "width": 1, "nombre": "nombre de imagen", "thumbnail": "/media/cache/82/ba/82ba36a6e57b0c57467b8e31cca863ac.jpg"}]}')

    @classmethod
    def tearDownClass(cls):
        if exists(settings.MEDIA_ROOT):
            import shutil
            shutil.rmtree(settings.MEDIA_ROOT)

        super(GaleriaTestCase, cls).tearDownClass()


class ContactoTestCase(BaseTestCase):
    def setUp(self):
        super(ContactoTestCase, self).setUp()
        Contacto.objects.create(texto='texto field')

    def test_contacto(self):
        response = self.client.get('/banda/contacto/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"texto": "texto field"}')
