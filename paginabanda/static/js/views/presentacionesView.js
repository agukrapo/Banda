define([ 'underscore', 
         'backbone',
         'collections/presentaciones',
         'text!template/presentaciones.html'
        ], function(_, Backbone, presentaciones, presentacionesTemplate) {
  
  var PresentationesView = Backbone.View.extend({
    collection: presentaciones,
    el: '#presentaciones',
    template: _.template(presentacionesTemplate),
    initialize: function() {
      this.render();
    },
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(presentaciones) {
          that.$el.html(that.template({ presentaciones: presentaciones.models, _: _ }));
        }
      });
      return this;
    }
  });
  
  return new PresentationesView();
});