define([ 'underscore', 'backbone', 'models/basemodel' ], function(_, Backbone, BaseModel) {
  var Fondos = BaseModel.extend({
    url : '/banda/fondos/'
  });
  
  return new Fondos();
});