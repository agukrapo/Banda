define([ 'jquery',
         'backstretch',
         'underscore', 
         'backbone',
         'loader',
         'models/fondos',
         'models/secciones'
       ], function($, backstretch, _, Backbone, Loader, fondos, secciones) {

  var Router = Backbone.Router.extend({
    baseTitle: 'Banda | ',
    routes: {
      '': 'inicio',
      'inicio': 'inicio',
      'nosotros': 'nosotros',
      'musica': 'musica',
      'videos': 'videos',
      'presentaciones': 'presentaciones',
      'muro': 'muro',
      'contacto': 'contacto',
      'fotos': 'fotos',
      '*default': 'inicio'
    },
    inicio: function() {
      this.common('inicio');
    },
    nosotros: function() {
      this.common('nosotros');
    },
    musica: function() {
      this.common('musica');
    },
    videos: function() {
      this.common('videos');
    },
    presentaciones: function() {
      this.common('presentaciones');
    },
    muro: function() {
      this.common('muro');
    },
    contacto: function() {
      this.common('contacto');
    },
    fotos: function() {
      this.common('fotos');
    },
    common: function(section) {
      if (!secciones.get('inicio')) {
        window.location = /maintenance/;
      } else {
        if (secciones.get(section)) {
          this.setTitle(section);
          Loader.show(section);
          require(['views/' + section + 'view'], function (view) {
            view.refresh(); 
          });
          this.transitionTo(section);
          setTimeout(Loader.hide, 300);
        } else {
          this.inicio();
        }
      }
    },
    transitionTo: function(section) {
      this.setFondo(section);
      require(['views/navigation'], function (navigation) {
        navigation.setActive(section);
      });
    },
    setFondo: function(section) {
      var src = fondos.get(section)
      if (src) {
        var fondo = new Image();
        fondo.src = src;
        
        fondo.onload = Loader.hide;
        if (fondo.complete) {
          Loader.hide();
        }
        
        $('body').backstretch(src);
      } else {
        $(':backstretch').data('backstretch') && $(':backstretch').data('backstretch').destroy();
        Loader.hide();
      }
    },
    setTitle: function(section) {
      document.title = this.baseTitle + secciones.get(section + 'Label');
    }
  });
  
  return new Router();
});