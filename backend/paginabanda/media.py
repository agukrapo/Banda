import re

from django.conf import settings
from django.conf.urls import url
from django.core.exceptions import ImproperlyConfigured
from django.views.static import serve


def media(prefix, view=serve, **kwargs):
    if prefix and '://' in prefix:
        return []
    elif not prefix:
        raise ImproperlyConfigured("Empty static prefix not permitted")
    return [
        url(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view, kwargs=kwargs),
    ]
