define([ 'underscore', 'backbone', 'models/basemodel' ], function(_, Backbone, BaseModel) {
  
  var Secciones = BaseModel.extend({
    url : '/banda/secciones/',
    moreThanInicioEnabled: function() {
      var result = false;
      if (this.get('inicio')) {
        for (attribute in this.attributes) {
          if (attribute !== 'inicio' && !attribute.endsWith('Label')) {
            result = result || this.get(attribute);
          }
        }
      }
      return result;
    }
  });
  
  return new Secciones();
});