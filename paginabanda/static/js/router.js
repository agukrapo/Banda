define([ 'jquery',
         'backstretch',
         'underscore', 
         'backbone',
         'loader',
         'models/fondos',
         'models/secciones',
         'views/inicioView'
         ], function($, backstretch, _, Backbone, Loader, fondos, secciones, inicio) {

  var setFondo = function(section) {
    var src = fondos.get(section)
    var fondo = new Image();
    fondo.src = src;
    
    fondo.onload = Loader.hide;
    if (fondo.complete) {
      Loader.hide();
    }
    
    $('body').backstretch(src);
  };
  
  var transitionTo = function(id) {
    var currentId = $('body').attr('currentsection');
    
    if (currentId !== undefined) {
      $('body').attr('transitioningTo', id);
      $('#' + currentId).hide();
      $('body').removeAttr('transitioningTo');
    }
    
    $('#' + id).show();
    setFondo(id);
    $('body').attr('currentsection', id);
    
    $('#navigation').find('li').removeClass('active');
    $('a[href="#' + id + '"]').parent().addClass('active');
  };
  
  var Router = Backbone.Router.extend({
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
    commonRoute: function(name, alwaysRender) {
      if (!secciones.get('inicio')) {
        window.location = /maintenance/;
      } else {
        if (secciones.get(name)) {
          Loader.show();
          
          require(['views/' + name + 'View'], function (view) {
            if (alwaysRender) {
              view.render();
            }
          });
          
          transitionTo(name);
        } else {
          this.inicio();
        }
      }
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
      this.commonRoute('presentaciones', true);
    },
    muro: function() {
      this.commonRoute('muro', true);
    },
    contacto: function() {
      this.commonRoute('contacto');
    },
    fotos: function() {
      this.commonRoute('fotos');
    }
  });
  
  return new Router();
});