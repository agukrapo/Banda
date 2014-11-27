define([ 'jquery' ], function($) {
  var selector = '#loader';
  return {
    show : function() {
      $(selector).show();
    },
    hide : function() {
      $(selector).hide();
    }
  };
});