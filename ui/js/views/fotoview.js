define([ 'jquery',
         'underscore', 
         'backbone',
         'echo',
         'text!template/foto.html'
       ], function($, _, Backbone, Echo, template) {

  return VideoIframe = Backbone.View.extend({
    el: '#modal-foto',
    template: _.template(template),
    render: function() {
      this.$el.html(this.template({ foto: this.model, _: _ }));
      this.$el.modal();
      Echo.init();
    },
  });
});