define([ 'underscore', 
         'backbone',
         'echo',
         'bootstrap',
         'views/pagedview',
         'collections/fotos',
         'text!template/fotos.html'
       ], function(_, Backbone, Echo, Bootstrap, PagedView, fotos, fotosTemplate) {

  var FotosView = PagedView.extend({
    el: '#fotos',
    collection: fotos,
    template: _.template(fotosTemplate),
    afterSuccess:function() {
      Echo.init();
    }
  });
  
  return new FotosView();
});