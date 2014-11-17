define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.View.extend({
    template: Banda.Utils.template('add-comentario-form'),
    events: {
      //'click #submit-comentario-form': 'submitMe',
      'submit': 'submitMe',
    },
    initialize: function() {
      this.model = new Banda.Models.Comentario();
    },
    render: function() {
      this.$el.html(this.template({ model: this.model, _: _ }));
      return this;
    },
    submitMe: function(event) {
      event.preventDefault();

      this.model.set('autor', this.$('#autor-field').val());
      this.model.set('comentario', this.$('#comentario-field').val());

      if (this.model.isValid()) {
        this.model.save();
        this.hideForm();
        this.view.initializeCollection();
        this.view.render();
      } else {
        this.hideErrors();
        this.showErrors();
      }
    },
    showForm: function(view) {
      this.view = view;
      $('#add-comentario-modal').modal('show');
    },
    hideForm: function() {
      $('#add-comentario-modal').modal('hide');
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
});