define([ 'underscore', 
         'backbone', 
         'models/presentacion',
         'collections/basecollection'
       ], function(_, Backbone, Presentacion, BaseCollection) {
  
  var Presentationes = BaseCollection.extend({
    model: Presentacion,
    url: '/banda/presentaciones/',
  });
  
  return new Presentationes();
});