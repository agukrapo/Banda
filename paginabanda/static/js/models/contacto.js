define([ 'underscore', 'backbone', 'models/basemodel' ], function(_, Backbone, BaseModel) {
  
  var Contacto = BaseModel.extend({
    url: '/banda/contacto/'
  });
  
  return new Contacto();
});