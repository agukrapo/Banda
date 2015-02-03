define([ 'views/basedataview' ], function(BaseDataView) {
  return BaseDataView.extend({
    nextPage: function() {
      this.data.next();
      this.data.fetch();
    },
    previousPage: function() {
      this.data.previous();
      this.data.fetch();
    },
    viewableData: function() {
      return this.data.models;
    },
  });
});