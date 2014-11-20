define([ 'underscore', 
         'backbone',
         'models/nosotros',
         'text!template/nosotros.html'
       ], function(_, Backbone, nosotros, nosotrosTemplate) {
  
  var NosotrosView = Backbone.View.extend({
    el: '#nosotros',
    model: nosotros,
    template: _.template(nosotrosTemplate),
    initialize: function() {
      this.render();
      return this;
    },
    render: function() {
      var that = this;
      this.model.fetch({
        success: function(nosotros) {
          that.$el.html(that.template({ nosotros: nosotros.attributes, _: _ }));
        }
      });
      return this;
    }
  });
  
  return new NosotrosView();
});