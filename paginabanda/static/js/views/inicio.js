define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    render : function() {
      $('#logo').attr('src', Banda.Instances.fondos.get('logo'));
      return this;
    },
    initialize : function() {
      this.render();
    }
  });
});