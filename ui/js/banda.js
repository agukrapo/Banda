define([ 'jquery',
         'backbone', 
         'models/fondos',
         'models/secciones'
         ], function($, Backbone, fondos, secciones) {

  $.when(fondos.fetch(), secciones.fetch()).done(function() {

    require(['views/navigation'], function (navigation) {
      navigation.render();
    });
    
    require(['router'], function (router) {
      Backbone.history.start();
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
      console.log('banda begun');
    }
  };
});
