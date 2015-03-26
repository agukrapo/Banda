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
      this.$el.html(this.template());
      this.setup();
    },
    setup: function() {
      this.$el.find('a').each($.proxy(this.each, this)).click($.proxy(this.click, this));
    },
    isTransitioning: function() {
      return $('body').attr('transitioningTo') !== undefined;
    },
    getSection: function(a) {
      return $(a).attr('href').replace('#', '');
    },
    each: function(i, a) {
      if (!secciones.get(this.getSection(a))) {
        $(this).parent().remove();
      }
    },
    click: function(clickEvent) {
      if (!this.isTransitioning()) {
        var section = this.getSection(clickEvent.currentTarget);
        require(['router'], function (router) {
          router.navigate(section, { trigger: true });
        });
      }
      clickEvent.preventDefault();
    },
    setActive: function(section) {
      this.$el.find('li').removeClass('active');
      this.$el.find('a[href="#' + section + '"]').parent().addClass('active');
    }
  });
    
  return new Navigation();    
});
