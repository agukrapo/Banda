define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    collection: Banda.Collections.Musica,
    el: '#musica',
    template: Banda.Utils.template('musica-template'),
    render: function() {
      var that = this;
      var musica = new Banda.Collections.Musica();
      musica.fetch({
        success: function(musica) {
          that.$el.html(that.template({ musica: musica.models, _: _ }));
          echo.init();
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