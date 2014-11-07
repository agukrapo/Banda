String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.contains = function(fragment) {
    return this.search(fragment) != -1;
}

window.Banda = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Utils: {},
  Instances: {}
};

Banda.Utils = {
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
    Banda.Utils.hideModal();
  },
  hideModal: function() {
    $('#modal').delay(250).fadeOut('slow');
  },
  setFondo: function(section) {
    $('body').backstretch(Banda.Instances.fondos.get(section));
  },
  showErrorMsg: function(model, response, options) {
    $('#error-msg-modal').modal();
  },
  initializePage: function() {
    Banda.Utils.loadFondosAndSecciones(Banda.Utils.setupRoutes);
  }
};

/////////// SECCIONES ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Secciones = Backbone.Model.extend({
  url: '/banda/secciones/',
});

/////////// FONDOS ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Fondos = Backbone.Model.extend({
  url: '/banda/fondos/',
});

/////////// INICIO ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Views.InicioView = Backbone.View.extend({
  render: function() {
    $('#logo').attr('src', Banda.Instances.fondos.get('logo')).css('position', 'absolute');
    return this;
  },
  initialize: function() {
    this.render();
  }
});

/////////// NOSOTROS ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Nosotros = Backbone.Model.extend({
  url: '/banda/nosotros/'
});

Banda.Views.NosotrosView = Backbone.View.extend({
  el: '#nosotros',
  template: Banda.Utils.template('nosotros-template'),
  render: function() {
    var that = this;
    var nosotros = new Banda.Models.Nosotros();
    nosotros.fetch({
      success: function(nosotros) {
        that.$el.html(that.template({ nosotros: nosotros.attributes, _: _ }));
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  },
  initialize: function() {
    this.render();
  }
});

/////////// CONTACTO ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Contacto = Backbone.Model.extend({
  url: '/banda/contacto/'
});

Banda.Views.ContactoView = Backbone.View.extend({
  el: '#contacto',
  template: Banda.Utils.template('contacto-template'),
  render: function() {
    var that = this;
    var contacto = new Banda.Models.Contacto();
    contacto.fetch({
      success: function(contacto) {
        that.$el.html(that.template({ contacto: contacto.attributes, _: _ }));
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  },
  initialize: function() {
    this.render();
  }
});

/////////// MUSICA ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Album = Backbone.Model.extend({ });

Banda.Collections.Musica = Backbone.Collection.extend({
  model: Banda.Models.Album,
  url: '/banda/musica/',
});

Banda.Views.MusicaView = Backbone.View.extend({
  collection: Banda.Collections.Musica,
  el: '#musica',
  template: Banda.Utils.template('musica-template'),
  render: function() {
    var that = this;
    var musica = new Banda.Collections.Musica();
    musica.fetch({
      success: function(musica) {
        that.$el.html(that.template({ musica: musica.models, _: _ }));
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  },
  initialize: function() {
    this.render();
  }
});

/////////// PAGINATION SUPPORT /////////////////////////////////////////////////////////////////////////////////////////

Banda.Collections.PagedCollection = Backbone.Collection.extend({
  current: 1,
  total: undefined,
  urlPart: 'OVERIDE-ME',
  url: function() {
    return this.urlPart + '?page=' + this.current;
  },
  parse: function(response) {
    this.total = response.total;
    this.current = response.current
    return response.elements;
  },
  hasNext: function() {
    return this.total && this.current < this.total;
  },
  next: function() {
    if (this.hasNext()) {
      this.current++;
    }
  },
  hasPrevious: function() {
    return this.current > 1;
  },
  previous: function() {
    if (this.hasPrevious()) {
      this.current--;
    }
  }
});

Banda.Views.PagedView = Backbone.View.extend({
  events: {
    "click #next-page": "nextPage",
    "click #previous-page": "previousPage"
  },
  initializeCollection: function() {
    alert('OVERIDE-ME');
  },
  initialize: function() {
    this.initializeCollection(),
    this.render();
  },
  mapAfterFetch: function(model) { },
  render: function() {
    var that = this;
    this.collection.fetch({
      success: function(collection) {
        collection.map(that.mapAfterFetch);
        that.$el.html(that.template({ collection: collection, _: _ }));
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  },
  nextPage: function() {
    this.collection.next();
    this.render();
  },
  previousPage: function() {
    this.collection.previous();
    this.render();
  }
});

/////////// VIDEOS ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Video = Backbone.Model.extend({ });

Banda.Collections.Videos = Banda.Collections.PagedCollection.extend({
  model: Banda.Models.Video,
  urlPart: '/banda/videos/'
});

Banda.Views.VideosView = Banda.Views.PagedView.extend({
  el: '#videos',
  template: Banda.Utils.template('videos-template'),
  mapAfterFetch: function(video) {
    var videoId = Banda.Utils.youtubeVideoId(video.get('url'));
    video.set('thumbnail', '//img.youtube.com/vi/' + videoId + '/0.jpg');
    video.set('embed', '//www.youtube.com/embed/' + videoId);
    return video;
  },
  initializeCollection: function() {
    this.collection = new Banda.Collections.Videos();
  }
});

/////////// FOTOS ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Foto = Backbone.Model.extend({ });

Banda.Collections.Fotos = Banda.Collections.PagedCollection.extend({
  model: Banda.Models.Foto,
  urlPart: '/banda/fotos/'
});

Banda.Views.FotosView = Banda.Views.PagedView.extend({
  el: '#fotos',
  template: Banda.Utils.template('fotos-template'),
  initializeCollection: function() {
    this.collection = new Banda.Collections.Fotos();
  }
});

/////////// PRESENTACION ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Presentacion = Backbone.Model.extend({ });

Banda.Collections.Presentaciones = Backbone.Collection.extend({
  model: Banda.Models.Presentacion,
  url: '/banda/presentaciones/',
});

Banda.Views.PresentacionesView = Backbone.View.extend({
  collection: Banda.Collections.Presentaciones,
  el: '#presentaciones',
  template: Banda.Utils.template('presentaciones-template'),
  initialize: function() {
    this.render();
  },
  render: function() {
    var that = this;
    var presentaciones = new Banda.Collections.Presentaciones();
    presentaciones.fetch({
      success: function(presentaciones) {
        that.$el.html(that.template({ presentaciones: presentaciones.models, _: _ }));
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  }
});

/////////// MURO ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Models.Comentario = Backbone.Model.extend({
  url: '/banda/comentario/',
  validate: function(attrs, options) {
    var errors = [];
    var autorResult = this.validateAutor(attrs.autor);
    if (autorResult) {
      errors.push({name: 'autor', msg: autorResult});
    }
    var comentarioResult = this.validateComentario(attrs.comentario);
    if (comentarioResult) {
      errors.push({name: 'comentario', msg: comentarioResult});
    }
    return errors.length > 0? errors: false;
  },
  validateAutor: function(autor) {
    return this.commonValidate(autor, 100);
  },
  validateComentario: function(comentario) {
    return this.commonValidate(comentario, 2000);
  },
  commonValidate: function(value, length) {
    if (!value) {
      return 'Requerido.';
    }
    if (value.length > length) {
      return 'Máximo ' + length + ' letras.';
    }
  }
});

Banda.Collections.Muro = Banda.Collections.PagedCollection.extend({
    model: Banda.Models.Comentario,
    urlPart: '/banda/muro/'
});

Banda.Views.ComentarioForm = Backbone.View.extend({
  template: Banda.Utils.template('add-comentario-form'),
  events: {
    //'click #submit-comentario-form': 'submitMe',
    'submit': 'submitMe',
  },
  initialize: function() {
    this.model = new Banda.Models.Comentario();
  },
  render: function() {
    this.$el.html(this.template({ model: this.model, _: _ }));
    return this;
  },
  submitMe: function(event) {
    event.preventDefault();

    this.model.set('autor', this.$('#autor-field').val());
    this.model.set('comentario', this.$('#comentario-field').val());

    if (this.model.isValid()) {
      this.model.save();
      this.hideForm();
      this.view.initializeCollection();
      this.view.render();
    } else {
      this.hideErrors();
      this.showErrors();
    }
  },
  showForm: function(view) {
    this.view = view;
    $('#add-comentario-modal').modal('show');
  },
  hideForm: function() {
    $('#add-comentario-modal').modal('hide');
  },
  showErrors: function() {
    _.each(this.model.validationError, function (error) {
      $('.' + error.name).addClass('has-error').find('.help-block').show().text(error.msg);
    }, this);
  },
  hideErrors: function () {
    this.$('.form-group').removeClass('has-error').find('.help-block').hide().text('');
  }
});

Banda.Views.MuroView = Banda.Views.PagedView.extend({
  el: '#muro',
  template: Banda.Utils.template('muro-template'),
  events: {
    'click #add-comentario': 'showForm',
    "click #next-page": "nextPage",
    "click #previous-page": "previousPage"
  },
  initializeCollection: function() {
    this.collection = new Banda.Collections.Muro();
    this.form = new Banda.Views.ComentarioForm();
  },
  render: function() {
    this.form.render();
    var that = this;
    this.collection.fetch({
      success: function(collection) {
        that.$el.html(that.template({ collection: collection, _: _ }));
        that.$el.append(that.form.$el);
      },
      error: Banda.Utils.showErrorMsg
    });
    return this;
  },
  showForm: function() {
    this.form.showForm(this);
  },
});


/////////// ROUTER ///////////////////////////////////////////////////////////////////////////////////////////////////

Banda.Router = Backbone.Router.extend({
  routes: {
    '': 'inicio',
    'inicio': 'inicio',
    'nosotros': 'nosotros',
    'musica': 'musica',
    'videos': 'videos',
    'presentaciones': 'presentaciones',
    'muro': 'muro',
    'contacto': 'contacto',
    'fotos': 'fotos',
    '*default': 'inicio'
  },
  commonRoute: function(name, alwaysRender) {
    if (!Banda.Instances.secciones.get('inicio')) {
      window.location = /maintenance/;
    } else {
      if (Banda.Instances.secciones.get(name)) {
        if (Banda.Instances[name + 'View'] === undefined) {
          Banda.Instances[name + 'View'] = new Banda.Views[name.capitalize() + 'View']();
        } else if (alwaysRender) {
          Banda.Instances[name + 'View'].render();
        }
        Banda.Utils.transitionTo(name);
      } else {
        this.inicio();
      }
    }
  },
  inicio: function() {
    this.commonRoute('inicio');
  },
  nosotros: function() {
    this.commonRoute('nosotros');
  },
  musica: function() {
    this.commonRoute('musica');
  },
  videos: function() {
    this.commonRoute('videos');
  },
  presentaciones: function() {
    this.commonRoute('presentaciones', true);
  },
  muro: function() {
    this.commonRoute('muro', true);
  },
  contacto: function() {
    this.commonRoute('contacto');
  },
  fotos: function() {
    this.commonRoute('fotos');
  }
});

$(function() {
  Banda.Utils.initializePage();
});
