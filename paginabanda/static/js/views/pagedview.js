define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    events: {
      "click #next-page": "nextPage",
      "click #previous-page": "previousPage"
    },
    initializeCollection: function() {  },
    initialize: function() {
      this.initializeCollection(),
      this.render();
    },
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(collection) {
          that.$el.html(that.template({ collection: collection, _: _ }));
          that.afterSuccess();
        }
      });
      return this;
    },
    afterSuccess: function() {},
    nextPage: function() {
      this.collection.next();
      this.render();
    },
    previousPage: function() {
      this.collection.previous();
      this.render();
    }
  });
});