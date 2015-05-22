define([ 'jquery',
         'underscore', 
         'backbone',
         'echo',
         'text!template/foto.html'
       ], function($, _, Backbone, Echo, template) {

  return Backbone.View.extend({
    el: '#modal-foto',
    template: _.template(template),
    render: function() {
//      this.$el.html(this.template({ foto: this.model, _: _ }));
      
      var that = this;
      this.$el.magnificPopup({
        items: {
            src: that.model.get('url')
        },
        type: 'image',
        image: {
          cursor: null, 
          titleSrc: function(item) {
            return that.model.get('descripcion');
          }
        }
      }).magnificPopup('open');
      
      Echo.init();
    },
  });
});