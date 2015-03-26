define([ 'underscore', 
         'echo',
         'bootstrapmodal',
         'views/collectionview',
         'collections/fotos',
         'text!template/fotos.html'
       ], function(_, Echo, Modal, CollectionView, fotos, template) {

  var FotosView = CollectionView.extend({
    data: fotos,
    template: _.template(template),
    events: {
      "click #next-fotos-page": "nextPage",
      "click #previous-fotos-page": "previousPage"
    },
    afterRender:function() {
      Echo.init();
    }
  });
  
  return new FotosView();
});