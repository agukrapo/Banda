define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    el: '#contenido',
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
    render: function() {
      this.$el.html(this.template({ data: this.data, _: _ }));
      this.afterRender();
    },
    afterRender: function() {}
  });
});