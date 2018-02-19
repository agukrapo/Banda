define([ 'jquery' ], function($) {
  var selector = '#loader';
  var hideAttempts;
  var alreadyLoaded = {};
  
  return {
    show : function(section) {
      if (!alreadyLoaded[section]) {
        alreadyLoaded[section] = true;
        hideAttempts = 3;
        $(selector).show();
      }
    },
    hide : function() {
      if (hideAttempts === 1) {
        hideAttempts = undefined;
        $(selector).fadeOut();
      } else {
        hideAttempts--;
      }
    }
  };
});