define(['jquery', 
        'underscore', 
        'backbone', 
        'models/fondos',
        'text!template/inicio.html'
       ], function($, _, Backbone, fondos, template) {
  
  var Inicio = Backbone.View.extend({
    el: '#contenido',
    template: _.template(template),
    refresh: function() {
      this.render();
    },
    render : function() {
      this.$el.html(this.template())
      $('#logo').attr('src', fondos.get('logo'));
    }
  });
  
  return new Inicio();
});