define(['jquery',
        'echo',
        'views/baseview',
        'models/fondos',
        'text!template/inicio.html'
       ], function($, Echo, BaseView, fondos, template) {
  
  var Inicio = BaseView.extend({
    template: _.template(template),
    actualRender : function() {
      this.$el.html(this.template({ logoSrc: fondos.get('logo'), _: _ }));
      Echo.init();
    }
  });
  
  return new Inicio();
});