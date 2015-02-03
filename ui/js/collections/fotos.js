define(['models/foto', 'collections/pagedcollection'], function(Foto, PagedCollection) {
  
  var Fotos = PagedCollection.extend({
    model: Foto,
    urlPart: '/banda/fotos/'
  });
  
  return new Fotos();
});