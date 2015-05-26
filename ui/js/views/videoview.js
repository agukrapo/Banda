define([ 'jquery',
         'underscore', 
         'backbone',
       ], function($, _, Backbone, template) {

  return Backbone.View.extend({
    el: '#modal-video',
    render: function() {
      var that = this;
      this.$el.magnificPopup({
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
      }).magnificPopup('open');
    },
  });
});