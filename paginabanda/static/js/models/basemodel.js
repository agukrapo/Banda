define([ 'underscore', 'backbone', 'views/error'], function(_, Backbone, error) {
  return Backbone.Model.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function() {
        error.show();
      }; 
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });
});