define([ 'jquery' ], function($) {
  var selector = '#loader';
  var hideAttempts;
  
  return {
    show : function() {
      hideAttempts = 2;
      $(selector).show();
    },
    hide : function() {
      if (hideAttempts === 1) {
        $(selector).fadeOut();
      } else {
        hideAttempts--;
      }
    }
  };
});