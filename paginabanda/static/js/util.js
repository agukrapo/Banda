define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return {
    template: function(id) {
      return _.template( $('#' + id).html());
    },
    youtubeVideoId: function(url) {
      var result = '';
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match){
        result = match[7];
      }
      return result;
    },
    resize: function() {
      var windowHeight = $(window).height()
      $('section').css('height', windowHeight + 'px');
      $(window).resize(function() {
        var windowHeight = $(window).height()
        $('section').css('height', windowHeight + 'px');
      });
    },
    isTransitioning: function() {
      return $('body').attr('transitioningTo') !== undefined;
    },
    transitionTo: function(id) {
      var currentId = $('body').attr('currentsection');

      if (currentId !== undefined) {
        $('body').attr('transitioningTo', id);
        $('#' + currentId).hide();
        $('body').removeAttr('transitioningTo');
      }

      $('#' + id).show();
      Banda.Utils.setFondo(id);
      $('body').attr('currentsection', id);

      $('#navigation').find('li').removeClass('active');
      $('a[href="#' + id + '"]').parent().addClass('active');
    },
    setupNavigation: function() {
      var $nav = $('#navigation').find('a');

      $nav.each(function() {
        if (!Banda.Instances.secciones.get($(this).attr('href').replace('#', ''))) {
          $(this).parent().remove();
        }
      });

      $nav.click(function(clickEvent) {
        if (!Banda.Utils.isTransitioning()) {
          Banda.Instances.router.navigate(
            $(clickEvent.currentTarget).attr('href').replace('#', ''), { trigger: true });
        }
        clickEvent.preventDefault();
      });
    },
    loadFondosAndSecciones: function(nextStep) {
      var fondos = new Banda.Models.Fondos();
      fondos.fetch({
        success: function(fetchedFondos) {
          Banda.Instances.fondos = fetchedFondos;

          var secciones = new Banda.Models.Secciones();
          secciones.fetch({
            success: function(fetchedSecciones) {
              Banda.Instances.secciones = fetchedSecciones;

              nextStep();
            },
            error: Banda.Utils.showErrorMsg
          });

        },
        error: Banda.Utils.showErrorMsg
      });
    },
    setupRoutes: function() {
      Banda.Instances.router = new Banda.Router();
      Backbone.history.start();

      Banda.Utils.setupNavigation();
      Banda.Utils.resize();
      //Banda.Utils.hideLoader();
    },
    showLoader: function() {
      $('#loader').show();
    },
    hideLoader: function() {
      $('#loader').hide();
    },
    setFondo: function(section) {
      var src = Banda.Instances.fondos.get(section)
      var fondo = new Image();
      fondo.src = src;
      
      fondo.onload = Banda.Utils.hideLoader;
      if (fondo.complete) {
        Banda.Utils.hideLoader();
      }
      
      $('body').backstretch(src);
    },
    showErrorMsg: function(model, response, options) {
      $('#error-msg-modal').modal();
    },
    initializePage: function() {
      Banda.Utils.loadFondosAndSecciones(Banda.Utils.setupRoutes);
    }
  };
});