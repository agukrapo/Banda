define([ 'underscore', 
         'views/basedataview',
         'models/contacto',
         'text!template/contacto.html'
       ], function(_, BaseDataView, contacto, template) {
  
  var ContactoView = BaseDataView.extend({
    template: _.template(template),
    data: contacto,
  });
  
  return new ContactoView();
});