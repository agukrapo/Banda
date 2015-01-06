define([ 'underscore', 
         'echo',
         'bootstrap',
         'views/collectionview',
         'collections/videos',
         'text!template/videos.html'
       ], function(_, Echo, Bootstrap, CollectionView, videos, template) {

  var VideosView = CollectionView.extend({
    data: videos,
    template: _.template(template),
    events: {
      "click #next-videos-page": "nextPage",
      "click #previous-videos-page": "previousPage"
    },
    afterRender:function() {
      Echo.init();
    }
  });

  return new VideosView();
});