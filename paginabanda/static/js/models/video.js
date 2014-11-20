define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Model.extend({
    parse: function(response, options) {
      var videoId = '';
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = response.url.match(regExp);
      if (match){
        videoId = match[7];
      }
      response.thumbnail = '//img.youtube.com/vi/' + videoId + '/0.jpg';
      response.embed = '//www.youtube.com/embed/' + videoId;
      return response;
    } 
  });
});