from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from django.contrib import admin
from paginabanda.media import media

admin.autodiscover()

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^noscript/$', TemplateView.as_view(template_name="noscript.html")),
    url(r'^oldbrowser/$', TemplateView.as_view(template_name="oldbrowser.html")),
    url(r'^maintenance/$', TemplateView.as_view(template_name="maintenance.html")),
    url(r'^banda/', include('banda.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^summernote/', include('django_summernote.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
