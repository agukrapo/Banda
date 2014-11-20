define([ 'underscore', 
         'backbone',
         'echo',
         'bootstrap',
         'collections/musica',
         'text!template/musica.html'
       ], function(_, Backbone, Echo, Bootstrap, musica, musicaTemplate) {
  
  var MusicaView = Backbone.View.extend({
    collection: musica,
    el: '#musica',
    template: _.template(musicaTemplate),
    initialize: function() {
      this.render();
      return this;
    },
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(musica) {
          that.$el.html(that.template({ musica: musica.models, _: _ }));
          Echo.init();
        }
      });
      return this;
    }
  });
  
  return new MusicaView();
});