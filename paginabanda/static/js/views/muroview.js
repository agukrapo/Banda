define([ 'underscore', 
         'bootstrap',
         'views/collectionview',
         'collections/muro',
         'views/comentarioform',
         'text!template/muro.html'
       ], function(_, Bootstrap, CollectionView, muro, form, template) {

  var MuroView = CollectionView.extend({
    el: '#contenido',
    template: _.template(template),
    data: muro,
    form: form,
    events: {
      "click #next-muro-page": "nextPage",
      "click #previous-muro-page": "previousPage",
      'click #add-comentario': 'showForm'
    },
    showForm: function() {
      this.form.render();
      this.$el.append(this.form.$el);
      this.form.showForm(this);
    },
  });
  
  return new MuroView();
});