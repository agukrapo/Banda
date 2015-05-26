define([ 'jquery',
         'underscore', 
         'backbone',
         'echo',
       ], function($, _, Backbone, Echo) {

  return Backbone.View.extend({
    el: '#modal-foto',
    render: function() {
     
      var that = this;
      this.$el.magnificPopup({
        items: {
            src: that.model.get('url')
        },
        type: 'image',
        image: {
          cursor: null, 
          titleSrc: function(item) {
            return that.model.get('nombre');
          }
        }
      }).magnificPopup('open');
      
      Echo.init();
    },
  });
});