define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Banda.Views.PagedView.extend({
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
    },
    afterSuccess:function() {
      echo.init();
    }
  });
});