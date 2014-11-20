define([ 'underscore', 
         'backbone', 
         'models/foto',
         'collections/pagedcollection'
       ], function(_, Backbone, Foto, PagedCollection) {
  
  var Fotos = PagedCollection.extend({
    model: Foto,
    urlPart: '/banda/fotos/'
  });
  
  return new Fotos();
});