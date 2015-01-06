define([ 'underscore', 
         'views/baseview',
         'models/contacto',
         'text!template/contacto.html'
       ], function(_, BaseView, contacto, template) {
  
  var ContactoView = BaseView.extend({
    template: _.template(template),
    data: contacto,
  });
  
  return new ContactoView();
});