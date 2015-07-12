define([ 'underscore', 
         'echo',
         'magnificpopup',
         'views/collectionview',
         'views/albumview',
         'collections/musica',
         'text!template/musica.html'
       ], function(_, Echo, magnificpopup, CollectionView, AlbumView, musica, template) {
  
  var MusicaView = CollectionView.extend({
    data: musica,
    template: _.template(template),
    events: {
      'click .album-thumbnail': 'openAlbum',
      'click #next-musica-page': 'nextPage',
      'click #previous-musica-page': 'previousPage'
    },
    afterRender:function() {
      Echo.init();
    },
    openAlbum: function(event) {
      var album = this.data.models[event.currentTarget.id];

      var albumView = new AlbumView();
      albumView.data = album;
      albumView.render();
      
      event.preventDefault();
    }
  });
  
  return new MusicaView();
});