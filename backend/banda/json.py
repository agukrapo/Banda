from django.db.models.base import ModelBase
from django.utils.encoding import force_text
try:
    import simplejson
except ImportError:
    from django.utils import simplejson


def dumps(content, json_opts={}):
    """
    Replaces simplejson.dumps with our own custom encoder
    """
    json_opts['ensure_ascii'] = json_opts.get('ensure_ascii', False)
    json_opts['cls'] = json_opts.get('cls', LazyJSONEncoder)

    return simplejson.dumps(content, **json_opts)


def parse(raw):
    return simplejson.loads(raw)


class LazyJSONEncoder(simplejson.JSONEncoder):
    """
    A JSONEncoder subclass that handles querysets and model objects.
    If the model object has a "serialize" method that returns a dictionary,
    then this method is used, else, it attempts to serialize fields.
    """

    def default(self, obj):  # pylint: disable=E0202
        # This handles querysets and other iterable types
        try:
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)

        # This handles Models
        if isinstance(obj.__class__, ModelBase):
            if hasattr(obj, 'serialize') and callable(getattr(obj, 'serialize')):
                return obj.serialize()
            return self.serialize_model(obj)

        # Other Python Types:
        try:
            return force_text(obj)
        except Exception:
            pass

        # Last resort:
        return super(LazyJSONEncoder, self).default(obj)

    def serialize_model(self, obj):
        tmp = {}
        many = [f.name for f in obj._meta.many_to_many]
        for field in obj._meta.get_all_field_names():
            if len(many) > 0 and field in many:
                many.remove(field)
                tmp[field] = getattr(obj, field).all()
            else:
                tmp[field] = getattr(obj, field, None)
        return tmp
