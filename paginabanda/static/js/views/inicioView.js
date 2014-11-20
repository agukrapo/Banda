define(['jquery', 'underscore', 'backbone', 'models/fondos'], function($, _, Backbone, fondos) {
  var Inicio = Backbone.View.extend({
    render : function() {
      $('#logo').attr('src', fondos.get('logo'));
      return this;
    },
    initialize : function() {
      this.render();
    }
  });
  
  return new Inicio();
});