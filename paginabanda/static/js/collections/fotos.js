define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Banda.Collections.PagedCollection.extend({
    model: Banda.Models.Foto,
    urlPart: '/banda/fotos/'
  });
});