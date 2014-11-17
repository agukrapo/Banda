define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    events: {
      "click #next-page": "nextPage",
      "click #previous-page": "previousPage"
    },
    initializeCollection: function() {
      alert('OVERIDE-ME');
    },
    initialize: function() {
      this.initializeCollection(),
      this.render();
    },
    mapAfterFetch: function(model) { },
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(collection) {
          collection.map(that.mapAfterFetch);
          that.$el.html(that.template({ collection: collection, _: _ }));
          that.afterSuccess();
        },
        error: Banda.Utils.showErrorMsg
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