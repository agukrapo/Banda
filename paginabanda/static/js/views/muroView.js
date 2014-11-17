define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Banda.Views.PagedView.extend({
    el: '#muro',
    template: Banda.Utils.template('muro-template'),
    events: {
      'click #add-comentario': 'showForm',
      "click #next-page": "nextPage",
      "click #previous-page": "previousPage"
    },
    initializeCollection: function() {
      this.collection = new Banda.Collections.Muro();
      this.form = new Banda.Views.ComentarioForm();
    },
    render: function() {
      this.form.render();
      var that = this;
      this.collection.fetch({
        success: function(collection) {
          that.$el.html(that.template({ collection: collection, _: _ }));
          that.$el.append(that.form.$el);
        },
        error: Banda.Utils.showErrorMsg
      });
      return this;
    },
    showForm: function() {
      this.form.showForm(this);
    },
  });
});