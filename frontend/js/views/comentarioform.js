define([ 'jquery',
         'underscore', 
         'backbone',
         'magnificpopup',
         'models/comentario',
         'text!template/comentarioform.html'
       ], function($, _, Backbone, magnificpopup, Comentario, comentarioFormTemplate) {

  var ComentarioForm = Backbone.View.extend({
    template: _.template(comentarioFormTemplate),
    events: {
      'submit': 'submitMe',
    },
    render: function() {
      this.model = new Comentario();
      this.$el.html(this.template({ comentario: this.model, _: _ }));
      this.hideErrors();
      return this;
    },
    submitMe: function(event) {
      event.preventDefault();
      this.model.set('autor', this.$('#autor-field').val());
      this.model.set('comentario', this.$('#comentario-field').val());
      if (this.model.isValid()) {
        this.model.save();
        this.hideForm();
        this.view.render();
      } else {
        this.hideErrors();
        this.showErrors();
      }
    },
    showForm: function(view) {
      this.view = view;
      $('#comentario-modal').modal('show');
    },
    hideForm: function() {
      $('#comentario-modal').modal('hide');
    },
    showErrors: function() {
      _.each(this.model.validationError, function (error) {
        $('.' + error.name).addClass('has-error').find('.help-block').show().text(error.msg);
      }, this);
    },
    hideErrors: function () {
      this.$('.form-group').removeClass('has-error').find('.help-block').hide().text('');
    }
  });
  
  return new ComentarioForm();
});