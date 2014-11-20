define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Model.extend({
    fetch : function(options) {
      options = options || {};    
      options.error = function() {
        require(['views/error'], function (error) {
          error.show();
        });
      }; 
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });
});