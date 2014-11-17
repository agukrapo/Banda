define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Banda.Collections.PagedCollection.extend({
    model: Banda.Models.Video,
    urlPart: '/banda/videos/'
  });
});