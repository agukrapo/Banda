define([ 'underscore', 
         'backbone',
         'bootstrap',
         'views/pagedview',
         'collections/muro',
         'views/comentarioform',
         'text!template/muro.html'
       ], function(_, Backbone, Bootstrap, PagedView, muro, comentarioForm, muroTemplate) {

  var MuroView = PagedView.extend({
    el: '#muro',
    template: _.template(muroTemplate),
    collection: muro,
    form: comentarioForm,
    events: {
      'click #add-comentario': 'showForm',
      "click #next-page": "nextPage",
      "click #previous-page": "previousPage"
    },
    initialize: function() { },
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(collection) {
          that.$el.html(that.template({ collection: collection, _: _ }));
        }
      });
      return this;
    },
    showForm: function() {
      this.form.render();
      this.$el.append(this.form.$el);
      this.form.showForm(this);
    },
  });
  
  return new MuroView();
});