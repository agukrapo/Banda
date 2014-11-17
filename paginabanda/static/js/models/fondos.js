define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Model.extend({
    url : '/banda/fondos/'
  });
});