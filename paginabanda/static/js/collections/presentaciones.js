define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Collection.extend({
    model: Banda.Models.Presentacion,
    url: '/banda/presentaciones/',
  });
});