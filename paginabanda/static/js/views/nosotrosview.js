define([ 'underscore',
         'views/baseview',
         'models/nosotros',
         'text!template/nosotros.html'
       ], function(_, BaseView, nosotros, template) {
  
  var NosotrosView = BaseView.extend({
    data: nosotros,
    template: _.template(template),
  });
  
  return new NosotrosView();
});