define([ 'underscore', 
         'echo',
         'modal',
         'useragent',
         'views/collectionview',
         'views/fotoview',
         'collections/fotos',
         'text!template/fotos.html'
       ], function(_, Echo, Modal, userAgent, CollectionView, FotoView, fotos, template) {

  var FotosView = CollectionView.extend({
    data: fotos,
    template: _.template(template),
    events: {
      'click .foto': 'openModal',
      "click #next-fotos-page": "nextPage",
      "click #previous-fotos-page": "previousPage"
    },
    afterRender:function() {
      Echo.init();
    },
    openModal: function(event) {
      var foto = this.data.models[event.currentTarget.id];
      if (userAgent.isMobile()) {
        window.location = foto.get('url');
      } else {
        var fotoView = new FotoView();
        fotoView.model = foto;
        fotoView.render();
      }
      event.preventDefault();
    }
  });
  
  return new FotosView();
});