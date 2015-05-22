define("text!template/foto.html",[],function(){return'\n<div class="modal-dialog modal-lg">\n  <div class="modal-content">\n    <div class="modal-body">\n      <img src="/static/img/img_load.gif" class="img-responsive" data-echo="<%=foto.get(\'url\')%>">\n    </div>\n    <%if (foto.get(\'descripcion\').length > 0) {%>\n    <div class="modal-footer">\n      <p><%=foto.get(\'descripcion\')%></p>\n    </div>\n    <% } %>\n  </div>\n</div>'}),define("views/fotoview",["jquery","underscore","backbone","echo","text!template/foto.html"],function(e,t,o,n,i){return o.View.extend({el:"#modal-foto",template:t.template(i),render:function(){var e=this;this.$el.magnificPopup({items:{src:e.model.get("url")},type:"image",image:{cursor:null,titleSrc:function(){return e.model.get("descripcion")}}}).magnificPopup("open"),n.init()}})}),define("models/foto",["models/basemodel"],function(e){return e.extend({})}),define("collections/fotos",["models/foto","collections/pagedcollection"],function(e,t){var o=t.extend({model:e,size:12,urlPart:"/banda/fotos/"});return new o}),define("text!template/fotos.html",[],function(){return'\n<div class="container">\n<%_.forEach(data.models, function (foto, i) {%> \n\n  <div class="fourth">\n    <a id="<%=i%>" class="foto thumbnail" href="#"> \n      <img src="/static/img/img_load.gif" class="img-responsive" data-echo="<%=foto.get(\'thumbnail\')%>" alt="<%=foto.get(\'descripcion\')%>">\n    </a>\n  </div>\n\n<% }) %> \n  \n  <div id="modal-foto" class="modal" tabindex="-1"></div>\n</div>\n  \n<%if (data.hasPrevious() || data.hasNext()) {%>\n<footer class="container">\n\n  <%if (data.hasPrevious()) {%>\n  <button id="previous-fotos-page" class="pull-left">Fotos M&aacute;s Nuevas</button>\n  <% } %>\n\n  <%if (data.hasNext()) {%>\n  <button id="next-fotos-page" class="pull-right">Fotos M&aacute;s Viejas</button>\n  <% } %>\n\n</footer>\n<% } %>\n'}),define("views/fotosview",["underscore","echo","modal","useragent","views/collectionview","views/fotoview","collections/fotos","text!template/fotos.html"],function(e,t,o,n,i,a,s,l){var d=i.extend({data:s,template:e.template(l),events:{"click .foto":"openModal","click #next-fotos-page":"nextPage","click #previous-fotos-page":"previousPage"},afterRender:function(){t.init()},openModal:function(e){var t=this.data.models[e.currentTarget.id];if(n.isMobile())window.location=t.get("url");else{var o=new a;o.model=t,o.render()}e.preventDefault()}});return new d});