define(['models/foto', 'collections/pagedcollection'], function(Foto, PagedCollection) {
  
  var Fotos = PagedCollection.extend({
    model: Foto,
    size: 12,
    urlPart: '/banda/fotos/'
  });
  
  return new Fotos();
});