define([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Collection.extend({
    current: 1,
    total: undefined,
    urlPart: 'OVERIDE-ME',
    url: function() {
      return this.urlPart + '?page=' + this.current;
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