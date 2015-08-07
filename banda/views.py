import datetime
from banda.json import dumps, parse
from banda.decorators import require_ajax, apply_restrictions_by_seccion, apply_restrictions_by_view_name
from django.http import HttpResponse, HttpResponseBadRequest, Http404
from django.views.decorators.http import require_GET, require_POST
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from banda.models import Fondos, Nosotros, Presentacion, Album, Video, Comentario, Foto, Contacto, Secciones


@require_GET
@require_ajax
def get_fondos(request):
    try:
        fondos = Fondos.objects.get(pk=1)
    except Fondos.DoesNotExist:
        return HttpResponse('{}', content_type='application/json')
    return HttpResponse(dumps(fondos), content_type='application/json')


@require_GET
@require_ajax
def get_secciones(request):
    try:
        secciones = Secciones.objects.get(pk=1)
    except Secciones.DoesNotExist:
        return HttpResponse('{}', content_type='application/json')
    return HttpResponse(dumps(secciones), content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_nosotros(request):
    try:
        nosotros = Nosotros.objects.get(pk=1)
    except Nosotros.DoesNotExist:
        nosotros = Nosotros(texto='Por favor inicializar base de datos')
    return HttpResponse(dumps(nosotros), content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_presentaciones(request):
    presentaciones = Presentacion.objects.all().filter(fecha__gt=timezone.now() - datetime.timedelta(hours=8))
    return HttpResponse(dumps(presentaciones), content_type='application/json')


@require_POST
@require_ajax
@apply_restrictions_by_seccion('muro')
def save_comentario(request):
    try:
        json = parse(request.body)
    except ValueError as error:
        return HttpResponseBadRequest(error)

    try:
        comentario = Comentario(autor=json["autor"], texto=json["comentario"])
    except KeyError as error:
        return HttpResponseBadRequest(error)

    try:
        comentario.validate_unique()
    except ValidationError as error:
        return HttpResponseBadRequest(dumps("Ya existe un comentario con este autor y texto."), content_type='application/json')

    try:
        comentario.clean_fields()
        comentario.clean()
    except ValidationError as error:
        return HttpResponseBadRequest(dumps(error.message_dict), content_type='application/json')

    comentario.save()

    return HttpResponse("Comentario procesado correctamente", status=201, content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_contacto(request):
    try:
        contacto = Contacto.objects.get(pk=1)
    except Contacto.DoesNotExist:
        contacto = Contacto(texto = 'Por favor inicializar base de datos')
    return HttpResponse(dumps(contacto), content_type='application/json')


def paginated_result(query_set, page_number, page_size):
    paginator = Paginator(query_set, page_size)
    try:
        page = paginator.page(page_number)
    except (PageNotAnInteger, EmptyPage):
        raise Http404
    return {'elements': page.object_list, 'current': page.number, 'total': paginator.num_pages}


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_videos(request):
    videos = paginated_result(Video.objects.all(), request.GET.get('page', 1), request.GET.get('size', 6))
    return HttpResponse(dumps(videos), content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_fotos(request):
    fotos = paginated_result(Foto.objects.all(), request.GET.get('page', 1), request.GET.get('size', 8))
    return HttpResponse(dumps(fotos), content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_muro(request):
    muro = paginated_result(Comentario.objects.all(), request.GET.get('page', 1), request.GET.get('size', 10))
    return HttpResponse(dumps(muro), content_type='application/json')


@require_GET
@require_ajax
@apply_restrictions_by_view_name
def get_musica(request):
    musica = paginated_result(Album.objects.all(), request.GET.get('page', 1), request.GET.get('size', 4))
    return HttpResponse(dumps(musica), content_type='application/json')

