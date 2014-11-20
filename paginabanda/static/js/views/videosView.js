define([ 'underscore', 
         'backbone',
         'echo',
         'bootstrap',
         'views/pagedview',
         'collections/videos',
         'text!template/videos.html'
       ], function(_, Backbone, Echo, Bootstrap, PagedView, videos, videosTemplate) {
  
  var VideosView = PagedView.extend({
    el: '#videos',
    template: _.template(videosTemplate),
    collection: videos,
    afterSuccess:function() {
      Echo.init();
    }
  });
  
  return new VideosView();
});