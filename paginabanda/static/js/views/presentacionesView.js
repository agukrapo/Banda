define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    collection: Banda.Collections.Presentaciones,
    el: '#presentaciones',
    template: Banda.Utils.template('presentaciones-template'),
    initialize: function() {
      this.render();
    },
    render: function() {
      var that = this;
      var presentaciones = new Banda.Collections.Presentaciones();
      presentaciones.fetch({
        success: function(presentaciones) {
          that.$el.html(that.template({ presentaciones: presentaciones.models, _: _ }));
        },
        error: Banda.Utils.showErrorMsg
      });
      return this;
    }
  });
});