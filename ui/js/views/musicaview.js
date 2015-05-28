define([ 'underscore', 
         'echo',
         'modal',
         'views/collectionview',
         'collections/musica',
         'text!template/musica.html'
       ], function(_, Echo, Modal, CollectionView, musica, template) {
  
  var MusicaView = CollectionView.extend({
    data: musica,
    template: _.template(template),
    events: {
      'click .album': 'openAlbum',
      'click #next-musica-page': 'nextPage',
      'click #previous-musica-page': 'previousPage'
    },
    afterRender:function() {
      Echo.init();
    },
    openAlbum: function(event) {
//      var foto = this.data.models[event.currentTarget.id];
//      if (userAgent.isMobile()) {
//        window.location = foto.get('url');
//      } else {
//        var fotoView = new FotoView();
//        fotoView.model = foto;
//        fotoView.render();
//      }
      console.log('works!')
      event.preventDefault();
    }
    
  });
  
  return new MusicaView();
});