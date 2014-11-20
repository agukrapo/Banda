define([ 'underscore', 
         'backbone', 
         'models/video',
         'collections/pagedcollection'
       ], function(_, Backbone, Video, PagedCollection) {

  var Videos = PagedCollection.extend({
    model: Video,
    urlPart: '/banda/videos/'
  });
  
  return new Videos();
});