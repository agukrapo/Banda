define("text!template/inicio.html",[],function(){return'<%if (logoSrc) {%>\n<img id="logo" src="<%-logoSrc%>" class="img-responsive center">\n<% } %>'}),define("views/inicioview",["jquery","views/baseview","models/fondos","text!template/inicio.html"],function(e,t,i,n){var o=t.extend({template:_.template(n),actualRender:function(){this.$el.html(this.template({logoSrc:i.get("logo"),_:_}))}});return new o});