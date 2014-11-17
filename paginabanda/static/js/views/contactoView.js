define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    el: '#contacto',
    template: Banda.Utils.template('contacto-template'),
    render: function() {
      var that = this;
      var contacto = new Banda.Models.Contacto();
      contacto.fetch({
        success: function(contacto) {
          that.$el.html(that.template({ contacto: contacto.attributes, _: _ }));
        },
        error: Banda.Utils.showErrorMsg
      });
      return this;
    },
    initialize: function() {
      this.render();
    }
  });
});