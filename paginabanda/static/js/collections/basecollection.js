define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Collection.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function(data) {
        require(['views/error'], function (error) {
          error.show(data);
        });
      }; 
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
});