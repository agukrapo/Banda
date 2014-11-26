define([ 'jquery', 
         'underscore', 
         'backbone',
         'bootstrap',
         'router',
         'models/secciones'], function($, _, Backbone, Bootstrap, router, secciones) {

  var isTransitioning = function() {
    return $('body').attr('transitioningTo') !== undefined;
  }
  
  return {
    setup: function() {
      var $nav = $('#navigation').find('a');

      $nav.each(function() {
        if (!secciones.get($(this).attr('href').replace('#', ''))) {
          $(this).parent().remove();
        }
      });

      $nav.click(function(clickEvent) {
        if (!isTransitioning()) {
          router.navigate($(clickEvent.currentTarget).attr('href').replace('#', ''), { trigger: true });
        }
        clickEvent.preventDefault();
      });
    }    
  };
});