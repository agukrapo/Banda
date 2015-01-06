define(['backbone' ], function(Backbone) {
  return Backbone.Model.extend({
    isFetched: false,
    fetch : function() {
      options = {};    
      options.error = function(data) {
        require(['views/error'], function (error) {
          error.show(data);
        });
      };
      var that = this;
      options.success = function() {
        that.isFetched = true;
      };
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });
});