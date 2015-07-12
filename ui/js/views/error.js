define([ 'jquery', 
         'magnificpopup',
         'text!template/error.html' 
       ], function($, magnificpopup, template) {
    
  var Error = Backbone.View.extend({
    template: _.template(template),
    show: function() {
      var that = this;
      $.magnificPopup.open({
        items: {
          type: 'inline',
          src: that.template(),
        }
      });
    } 
  });
  
  return new Error();
});