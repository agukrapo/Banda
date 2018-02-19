define([ 'underscore',
         'views/basedataview',
         'models/nosotros',
         'text!template/nosotros.html'
       ], function(_, BaseDataView, nosotros, template) {
  
  var NosotrosView = BaseDataView.extend({
    data: nosotros,
    template: _.template(template),
  });
  
  return new NosotrosView();
});