define([ 'underscore', 
         'views/basedataview',
         'collections/presentaciones',
         'text!template/presentaciones.html'
        ], function(_, CollectionView, presentaciones, template) {
  
  var PresentationesView = CollectionView.extend({
    data: presentaciones,
    template: _.template(template),
  });
  
  return new PresentationesView();
});