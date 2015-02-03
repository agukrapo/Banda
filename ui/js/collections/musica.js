define(['models/album', 'collections/basecollection'], function(Album, BaseCollection) {
  var Musica = BaseCollection.extend({
    model: Album,
    url: '/banda/musica/',
  });
  
  return new Musica();
});