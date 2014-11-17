define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Collection.extend({
    model: Banda.Models.Album,
    url: '/banda/musica/',
  });
});