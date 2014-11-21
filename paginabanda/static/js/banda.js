define([ 'jquery',
         'underscore', 
         'backbone', 
         'models/fondos',
         'models/secciones'
         ], function($, _, Backbone, fondos, secciones) {

  $.when(fondos.fetch(), secciones.fetch()).done(function() {
    
    require(['router'], function (router) {
      Backbone.history.start();
    });
  
    require(['navigation'], function (Navigation) {
      Navigation.setup();
    });
 
    var resize = function() {
      var windowHeight = $(window).height()
      $('section').css('height', windowHeight + 'px');
      $(window).resize(function() {
        var windowHeight = $(window).height()
        $('section').css('height', windowHeight + 'px');
      });
    }
    
    resize();
  });

  return {
    begin: function() {
//      console.log('banda begun');
    }
  };
});
