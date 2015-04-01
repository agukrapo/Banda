define([ 'underscore', 
         'backbone', 
         'collections/basecollection'], function(_, Backbone, BaseCollection) {
  return BaseCollection.extend({
    current: 1,
    size: undefined,
    total: undefined,
    urlPart: 'OVERIDE-ME',
    url: function() {
      return this.urlPart + this.buildPageUrlPart() + this.buildSizeUrlPart();
    },
    buildPageUrlPart: function() {
      return '?page=' + this.current;
    },
    buildSizeUrlPart: function() {
      return this.size? '&size=' + this.size: '';
    }, 
    parse: function(response) {
      this.total = response.total;
      this.current = response.current
      return response.elements;
    },
    hasNext: function() {
      return this.total && this.current < this.total;
    },
    next: function() {
      if (this.hasNext()) {
        this.current++;
      }
    },
    hasPrevious: function() {
      return this.current > 1;
    },
    previous: function() {
      if (this.hasPrevious()) {
        this.current--;
      }
    }
  });
});