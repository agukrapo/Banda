define([ 'jquery' ], function($) {
  var selector = '#loader';
  var hideAttempts;
  
  return {
    show : function() {
      hideAttempts = 3;
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