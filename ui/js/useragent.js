define(function() {
  var mql = window.matchMedia('(min-width: 750px)');
  
  return {
    isMobile: function() {
      return !mql.matches;
    }
  };
});