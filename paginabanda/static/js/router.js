define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Router.extend({
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
      if (!Banda.Instances.secciones.get('inicio')) {
        window.location = /maintenance/;
      } else {
        if (Banda.Instances.secciones.get(name)) {
          Banda.Utils.showLoader();
          if (Banda.Instances[name + 'View'] === undefined) {
            Banda.Instances[name + 'View'] = new Banda.Views[name.capitalize() + 'View']();
          } else if (alwaysRender) {
            Banda.Instances[name + 'View'].render();
          }
          Banda.Utils.transitionTo(name);
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
});