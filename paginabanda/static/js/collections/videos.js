define(['models/video', 'collections/pagedcollection'], function(Video, PagedCollection) {

  var Videos = PagedCollection.extend({
    model: Video,
    urlPart: '/banda/videos/'
  });
  
  return new Videos();
});