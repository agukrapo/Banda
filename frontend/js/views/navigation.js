define([ 'jquery', 
         'underscore', 
         'backbone', 
         'router',
         'models/secciones',
         'text!template/navigation.html'
       ], function($, _, Backbone, router, secciones, template) {

  var Navigation = Backbone.View.extend({
    el: '#page-header',
    template: _.template(template),
    render: function() {
      if (secciones.moreThanInicioEnabled()) {
        this.$el.html(this.template());
        this.setup();
      } else {
        this.$el.remove();
      }
    },
    setup: function() {
      this.$el.find('a').each($.proxy(this.each, this)).click($.proxy(this.click, this));
    },
    getSection: function(a) {
      return $(a).attr('href').replace('#', '');
    },
    each: function(i, a) {
      var seccion = this.getSection(a);
      if (!secciones.get(seccion)) {
        $(a).parent().remove();
      } else {
        $(a).html(secciones.get(seccion + 'Label'));
      }
    },
    click: function(clickEvent) {
      if(!this.isActive(clickEvent.currentTarget)) {
        var section = this.getSection(clickEvent.currentTarget);
        require(['router'], function (router) {
          router.navigate(section, { trigger: true });
        });
      }
      clickEvent.preventDefault();
    },
    isActive: function(a) {
      return $(a).parent().hasClass('active');
    },
    setActive: function(section) {
      this.$el.find('li').removeClass('active');
      this.$el.find('a[href="#' + section + '"]').parent().addClass('active');
    }
  });
    
  return new Navigation();    
});
