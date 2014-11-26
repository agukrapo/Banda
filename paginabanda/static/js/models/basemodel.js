define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Model.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function(data) {
        require(['views/error'], function (error) {
          error.show(data);
        });
      }; 
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });
});