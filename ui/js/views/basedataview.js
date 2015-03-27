define([ 'underscore', 'backbone', 'views/baseview' ], function(_, Backbone, BaseView) {
  return BaseView.extend({
    initialize: function() {
      this.listenTo(this.data, 'sync', this.render);
    },
    refresh: function() {
      if (this.data.isFetched) {
        this.render();
      } else {
        this.data.fetch();
      }
    },
    actualRender: function() {
      this.$el.html(this.template({ data: this.data, _: _ }));
      this.afterRender();
    },
    afterRender: function() {}
  });
});