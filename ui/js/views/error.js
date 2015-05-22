define([ 'jquery', 
         'modal', 
         'text!template/error.html' 
       ], function($, Modal, template) {
    
  var Error = Backbone.View.extend({
    template: _.template(template),
    initialize: function() {
      this.render();
    },
    render: function() {
      $('body').append(this.template())
    },
    show: function() {
      $('#error-msg-modal').modal();
    } 
  });
  
  return new Error();
});