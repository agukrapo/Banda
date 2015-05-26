define([ 'underscore', 
         'echo',
         'modal',
         'useragent',
         'views/collectionview',
         'views/videoview',
         'collections/videos',
         'text!template/videos.html'
       ], function(_, Echo, Modal, userAgent, CollectionView, VideoView, videos, template) {

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
      var video = this.data.models[event.currentTarget.id];
      if (userAgent.isMobile()) {
        window.location = video.get('url');
      } else {
        var videoView = new VideoView();
        videoView.model = video;
        videoView.render();
      }
      event.preventDefault();
    }
  });

  return new VideosView();
});