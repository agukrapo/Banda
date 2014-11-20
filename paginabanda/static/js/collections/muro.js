define([ 'underscore', 
         'backbone', 
         'models/comentario',
         'collections/pagedcollection'
       ], function(_, Backbone, Comentario, PagedCollection) {

  var Muro = PagedCollection.extend({
    model: Comentario,
    urlPart: '/banda/muro/'
  });
  
  return new Muro();
});