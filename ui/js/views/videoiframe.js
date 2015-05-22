define([ 'jquery',
         'underscore', 
         'backbone',
         'text!template/videoiframe.html'
       ], function($, _, Backbone, template) {

  return Backbone.View.extend({
    el: '#modal-video',
    template: _.template(template),
    render: function() {
      this.$el.html(this.template({ video: this.model, _: _ }));
      this.$el.modal();
    },
  });
});