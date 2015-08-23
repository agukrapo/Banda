define(['jquery', 
        'views/baseview',
        'models/fondos',
        'text!template/inicio.html'
       ], function($, BaseView, fondos, template) {
  
  var Inicio = BaseView.extend({
    template: _.template(template),
    actualRender : function() {
      this.$el.html(this.template({ logoSrc: fondos.get('logo'), _: _ }));
    }
  });
  
  return new Inicio();
});