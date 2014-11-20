define([ 'underscore', 'backbone' ], function(_, Backbone) {
  var Nosotros = Backbone.Model.extend({
    url : '/banda/nosotros/'
  });
  
  return new Nosotros();
});