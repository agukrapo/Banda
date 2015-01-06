define([ 'underscore', 
         'echo',
         'bootstrap',
         'views/collectionview',
         'collections/musica',
         'text!template/musica.html'
       ], function(_, Echo, Bootstrap, CollectionView, musica, template) {
  
  var MusicaView = CollectionView.extend({
    data: musica,
    template: _.template(template),
    afterRender:function() {
      Echo.init();
    }
  });
  
  return new MusicaView();
});