define([ 'underscore', 'backbone', 'models/basemodel' ], function(_, Backbone, BaseModel) {
  var Secciones = BaseModel.extend({
    url : '/banda/secciones/'
  });
  
  return new Secciones();
});