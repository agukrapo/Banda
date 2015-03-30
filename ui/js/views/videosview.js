define([ 'underscore', 
         'echo',
         'bootstrapmodal',
         'views/collectionview',
         'views/videoiframe',
         'collections/videos',
         'text!template/videos.html'
       ], function(_, Echo, Modal, CollectionView, Iframe, videos, template) {

  var VideosView = CollectionView.extend({
    data: videos,
    template: _.template(template),
    events: {
      'click .video': 'openModal',
      'click #next-videos-page': 'nextPage',
      'click #previous-videos-page': 'previousPage'
    },
    afterRender: function() {
      Echo.init();
    },
    openModal: function(event) {
      var iframe = new Iframe();
      iframe.model = this.data.models[event.currentTarget.id];
      iframe.render();
      event.preventDefault();
    }
  });

  return new VideosView();
});