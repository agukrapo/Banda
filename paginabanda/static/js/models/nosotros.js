define(['models/basemodel'], function(BaseModel) {
  var Nosotros = BaseModel.extend({
    url : '/banda/nosotros/'
  });
  
  return new Nosotros();
});