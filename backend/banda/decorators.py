from django.http import HttpResponseForbidden
from django.conf import settings
from functools import wraps
from django.utils.decorators import available_attrs
from django.http import HttpResponseForbidden
from banda.models import Secciones


def require_ajax(func):
    @wraps(func, assigned=available_attrs(func))
    def wrap(request, *args, **kwargs):
        if not settings.DEBUG and not request.is_ajax():
            return HttpResponseForbidden()
        return func(request, *args, **kwargs)
    return wrap


def check_seccion(seccion):
    try:
        secciones = Secciones.objects.get(pk=1).__dict__
    except Secciones.DoesNotExist:
        return HttpResponseForbidden()

    permission = False
    for key in secciones.keys():
        if key.startswith(seccion):
            permission = secciones[key]
            break

    if not permission:
        return HttpResponseForbidden()


def apply_restrictions_by_seccion(seccion_hablitada):
    def decorator(func):
        @wraps(func, assigned=available_attrs(func))
        def _wrapped_view(request, *args, **kwargs):
            result = check_seccion(seccion_hablitada)
            if result:
                return result
            return func(request, *args, **kwargs)
        return _wrapped_view
    return decorator


def apply_restrictions_by_view_name(func):
    @wraps(func, assigned=available_attrs(func))
    def wrap(request, *args, **kwargs):
        result = check_seccion(func.__name__[func.__name__.index("_")+1:])
        if result:
            return result

        return func(request, *args, **kwargs)
    return wrap
