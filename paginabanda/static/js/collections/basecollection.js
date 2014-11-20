define([ 'underscore', 'backbone', 'views/error'], function(_, Backbone, error) {
  return Backbone.Collection.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function() {
        error.show();
      }; 
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
});