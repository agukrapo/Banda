from django.contrib import admin
from singleton_models.admin import SingletonModelAdmin
from banda.models import Cancion, Album, Presentacion, Fondos, Nosotros, Video, Foto, Comentario, Contacto, Secciones
from django_summernote.admin import SummernoteModelAdmin
from sorl.thumbnail.admin import AdminImageMixin

class NosotrosAdmin(SummernoteModelAdmin, SingletonModelAdmin):
    pass

class ContactoAdmin(SummernoteModelAdmin, SingletonModelAdmin):
    pass

class FondosAdmin(SingletonModelAdmin):
    pass

class FotosAdmin(AdminImageMixin, admin.ModelAdmin):
    pass

class SeccionesAdmin(SingletonModelAdmin):
    pass

admin.site.register(Cancion)
admin.site.register(Album)
admin.site.register(Presentacion)
admin.site.register(Foto, FotosAdmin)
admin.site.register(Fondos, FondosAdmin)
admin.site.register(Video)
admin.site.register(Comentario)
admin.site.register(Nosotros, NosotrosAdmin)
admin.site.register(Contacto, ContactoAdmin)
admin.site.register(Secciones, SeccionesAdmin)
