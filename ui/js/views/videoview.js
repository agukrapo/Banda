define([ 'jquery',
         'underscore',
         'magnificpopup',
         'backbone',
       ], function($, _, magnificpopup, Backbone, template) {

  return Backbone.View.extend({
    render: function() {
      var that = this;
      $.magnificPopup.open({
        items: {
            src: that.model.get('url')
        },
        type: 'iframe',
        iframe: {
          cursor: null, 
          titleSrc: function(item) {
            return that.model.get('nombre');
          },
          patterns: {
            youtube_short: {
              index: 'youtu.be/',
              id: 'youtu.be/',
              src: '//www.youtube.com/embed/%id%?autoplay=1'
            }
          }
        }
      });
    },
  });
});