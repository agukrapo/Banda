define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Collection.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function() {
        require(['views/error'], function (error) {
          error.show();
        });
      }; 
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
});