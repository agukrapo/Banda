import mock

from django.test import TestCase, Client

from banda.models import Secciones, Fondos, Album, Cancion, Video, Nosotros, Presentacion, Comentario, Foto, Contacto

from datetime import datetime

from django.core.files.uploadedfile import SimpleUploadedFile


def faketoday():
    return datetime(2012, 11, 3)


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
    def setUp(self):
        super(FotosTestCase, self).setUp()
        Foto.objects.create(nombre='nombre field', imagen=SimpleUploadedFile(name='foo.gif', content=b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'), fecha='2015-07-14 12:30')

    def test_fotos(self):
        response = self.client.get('/banda/fotos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{}')


class ContactoTestCase(BaseTestCase):
    def setUp(self):
        super(ContactoTestCase, self).setUp()
        Contacto.objects.create(texto='texto field')

    def test_contacto(self):
        response = self.client.get('/banda/contacto/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"texto": "texto field"}')


class SeccionesTestCase(BaseTestCase):
    def setUp(self):
        super(SeccionesTestCase, self).setUp()

    def test_secciones(self):
        response = self.client.get('/banda/secciones/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"nosotros": true, "musica": true, "contacto": true, "videos": true, "inicio": true, "fotos": true, "muro": true, "presentaciones": true}')