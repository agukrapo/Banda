define([ 'underscore',
         'echo',
         'views/baseview',
         'views/cancionview',
         'text!template/album.html',
         'router'
       ], function(_, Echo, BaseView, CancionView, template, router) {
  
  return BaseView.extend({
    events: {
      'click .volver': 'volver',
      'click .cancion': 'openCancion',
    },
    template: _.template(template),
    actualRender: function() {
      this.$el.html(this.template({ album: this.data, _: _ }));
      Echo.init();
    },
    volver: function() { 
      router.musica();
    },
    openCancion: function(event) {
      event.preventDefault();
      var cancionView = new CancionView();
      cancionView.url = event.currentTarget.href;
      cancionView.render();
    }
  });
});