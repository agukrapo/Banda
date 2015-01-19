define([ 'jquery',
         'backstretch',
         'underscore', 
         'backbone',
         'loader',
         'models/fondos',
         'models/secciones'
       ], function($, backstretch, _, Backbone, Loader, fondos, secciones) {

  var Router = Backbone.Router.extend({
    baseTitle: 'basettitle | ',
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
      this.commonRoute('inicio');
    },
    nosotros: function() {
      this.commonRoute('nosotros');
    },
    musica: function() {
      this.commonRoute('musica');
    },
    videos: function() {
      this.commonRoute('videos');
    },
    presentaciones: function() {
      this.commonRoute('presentaciones');
    },
    muro: function() {
      this.commonRoute('muro');
    },
    contacto: function() {
      this.commonRoute('contacto');
    },
    fotos: function() {
      this.commonRoute('fotos');
    },
    commonRoute: function(name) {
      if (!secciones.get('inicio')) {
        window.location = /maintenance/;
      } else {
        if (secciones.get(name)) {
          document.title = this.baseTitle + name;
          Loader.show();
          require(['views/' + name + 'view'], function (view) {
            view.refresh(); 
          });
          this.transitionTo(name);
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
      var fondo = new Image();
      fondo.src = src;
      
      fondo.onload = Loader.hide;
      if (fondo.complete) {
        Loader.hide();
      }
      
      $('body').backstretch(src);
    }
    
  });
  
  return new Router();
});