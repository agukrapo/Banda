define([ 'underscore', 
         'backbone', 
         'models/album',
         'collections/basecollection'], function(_, Backbone, Album, BaseCollection) {
  var Musica = BaseCollection.extend({
    model: Album,
    url: '/banda/musica/',
  });
  
  return new Musica();
});