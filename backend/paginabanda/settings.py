# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os, sys
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SETTINGS_PATH = os.path.normpath(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '\$`,$x9?HVY=]cC}_]4q\ym_JvRUuK+kBuY2<8@t"MKhv.%G^:l$?Cvj?s;7J);oxg!ga$2Aj\'Zz9PPwlF<^{eM*1$5qo8-74]~7'

#DEBUG = False
DEBUG = (sys.argv[1] == 'runserver')


TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'singleton_models',
    'sorl.thumbnail',
    'django_summernote',
    'banda',
    'storages',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'paginabanda.urls'

WSGI_APPLICATION = 'paginabanda.wsgi.application'


# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

LANGUAGE_CODE = 'es-ar'

TIME_ZONE = 'America/Argentina/Cordoba'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static_root')
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(SETTINGS_PATH, 'static'),
)

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'


TEMPLATE_DIRS = (
    os.path.join(SETTINGS_PATH, 'html'),
)

SUMMERNOTE_CONFIG = {
    'width': '100%',
    'height': '500',
    'lang': 'es-ES',
}

ADMINS = (('agu', 'agukrapo@gmail.com'), )

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'logfile': {
            'class': 'logging.handlers.WatchedFileHandler',
            'filename': os.path.join(BASE_DIR, 'server.log')
        },
    },
    'loggers': {
        'django': {
            'handlers': ['logfile'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}

#X_FRAME_OPTIONS = 'DENY' summertnote won't work
#CSRF_COOKIE_SECURE = True
#CSRF_COOKIE_HTTPONLY = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
#SESSION_COOKIE_SECURE = True

STATIC_FILES_LOCATION = 'static'

MEDIA_FILES_LOCATION = 'media'

import tempfile
MEDIA_ROOT = os.path.join(tempfile.gettempdir(), 'media_root')
MEDIA_URL = '/media/'