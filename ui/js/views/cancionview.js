define([ 'jquery',
         'underscore',
         'magnificpopup',
         'backbone',
         'text!template/cancion.html',
       ], function($, _, magnificpopup, Backbone, template) {

  return Backbone.View.extend({
    template: _.template(template),
    render: function() {
      if (this.urlAccepted()) {
        var that = this;
        $.magnificPopup.open({
          closeBtnInside: false,
          items: {
            type: 'inline',
            src: that.template({url: that.url}),
          }
        });
      } else {
        window.location = this.url;
      }
    },
    urlAccepted: function() {
      return this.url.contains('soundcloud');
    }
  });
});