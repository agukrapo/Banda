define([ 'underscore',
         'echo',
         'views/baseview',
         'text!template/album.html',
         'router'
       ], function(_, Echo, BaseView, template, router) {
  
  return BaseView.extend({
    events: {
      'click .volver': 'volver',
    },
    template: _.template(template),
    actualRender: function() {
      this.$el.html(this.template({ album: this.data, _: _ }));
      Echo.init();
    },
    volver: function() { 
      router.musica();
    },
  });
});