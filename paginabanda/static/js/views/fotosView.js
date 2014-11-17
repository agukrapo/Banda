define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Banda.Views.PagedView.extend({
    el: '#fotos',
    template: Banda.Utils.template('fotos-template'),
    initializeCollection: function() {
      this.collection = new Banda.Collections.Fotos();
    },
    afterSuccess:function() {
      echo.init();
    }
  });
});