define([ 'underscore', 'backbone', 'loader' ], function(_, Backbone, Loader) {
  return Backbone.View.extend({
    el: '#contenido',
    refresh: function() {
      this.render();
    },
    render: function() {
      this.actualRender();
      setTimeout(Loader.hide, 200);
    },
    actualRender: function() {}
  });
});