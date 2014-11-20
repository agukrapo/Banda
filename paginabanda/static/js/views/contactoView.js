define([ 'underscore', 
         'backbone',
         'models/contacto',
         'text!template/contacto.html'
       ], function(_, Backbone, contacto, contactoTemplate) {
  
  var ContactoView = Backbone.View.extend({
    el: '#contacto',
    template: _.template(contactoTemplate),
    model: contacto,
    initialize: function() {
      this.render();
    },
    render: function() {
      var that = this;
      this.model.fetch({
        success: function(contacto) {
          that.$el.html(that.template({ contacto: contacto.attributes, _: _ }));
        }
      });
      return this;
    }
  });
  
  return new ContactoView();
});