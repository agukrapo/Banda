define([ 'underscore', 'backbone', 'utils'], function(_, Backbone, Utils) {
  return Backbone.View.extend({
    el: '#nosotros',
    template: Utils.template('nosotros-template'),
    render: function() {
      var that = this;
      var nosotros = new Banda.Models.Nosotros();
      nosotros.fetch({
        success: function(nosotros) {
          that.$el.html(that.template({ nosotros: nosotros.attributes, _: _ }));
        },
        error: Utils.showErrorMsg
      });
      return this;
    },
    initialize: function() {
      this.render();
    }
  });
});