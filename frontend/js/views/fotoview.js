define([ 'jquery',
         'underscore',
         'magnificpopup',
         'backbone',
         'echo',
       ], function($, _, magnificpopup, Backbone, Echo) {

  return Backbone.View.extend({
    render: function() {
      var that = this;
      $.magnificPopup.open({
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
      });
      
      Echo.init();
    },
  });
});