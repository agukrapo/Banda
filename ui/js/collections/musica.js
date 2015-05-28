define(['models/album', 'collections/pagedcollection'], function(Album, PagedCollection) {
  
  var Musica = PagedCollection.extend({
    model: Album,
    urlPart: '/banda/musica/',
  });
  
  return new Musica();
});