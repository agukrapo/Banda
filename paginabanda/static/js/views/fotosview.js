define("models/foto",["models/basemodel"],function(t){return t.extend({})}),define("collections/fotos",["models/foto","collections/pagedcollection"],function(t,o){var e=o.extend({model:t,urlPart:"/banda/fotos/"});return new e}),define("text!template/fotos.html",[],function(){return'\n<div class="container">\n  <header class="page-header">\n    <h1>Fotos</h1>\n  </header>\n\n  <%_.forEach(data.models, function (foto, i) {%> <%if (i % 4 === 0) {%>\n  <div class="row">\n    <%}%>\n\n    <div class="col-md-3">\n      <a class="thumbnail" href="#" data-toggle="modal" data-target="#modal-foto-<%=i%>"> \n        <img src="/static/img/img_load.gif" class="img-responsive" data-echo="<%=foto.get(\'thumbnail\')%>">\n      </a>\n    </div>\n\n    <div class="modal" id="modal-foto-<%=i%>" tabindex="-1">\n      <div class="modal-dialog">\n        <div class="modal-content">\n          <div class="modal-body">\n            <img src="/static/img/img_load.gif" class="img-responsive" data-echo="<%=foto.get(\'url\')%>">\n          </div>\n          <%if (foto.get(\'descripcion\').length > 0) {%>\n          <div class="modal-footer">\n            <p><%=foto.get(\'descripcion\')%></p>\n          </div>\n          <% } %>\n        </div>\n      </div>\n    </div>\n\n    <%if (i % 4 === 3 || i === (data.length - 1)) {%>\n  </div>\n  <% } %> <% }) %> <%if (data.hasPrevious() || data.hasNext()) {%>\n  <footer class="row">\n    <div class="col-md-6">\n      <%if (data.hasPrevious()) {%>\n      <button id="previous-fotos-page" class="btn btn-default pull-left">Fotos M&aacute;s Nuevas</button>\n      <% } %>\n    </div>\n    <div class="col-md-6">\n      <%if (data.hasNext()) {%>\n      <button id="next-fotos-page" class="btn btn-default pull-right">Fotos M&aacute;s Viejas</button>\n      <% } %>\n    </div>\n  </footer>\n  <% } %>\n</div>'}),define("views/fotosview",["underscore","echo","bootstrapmodal","views/collectionview","collections/fotos","text!template/fotos.html"],function(t,o,e,n,a,i){var s=n.extend({data:a,template:t.template(i),events:{"click #next-fotos-page":"nextPage","click #previous-fotos-page":"previousPage"},afterRender:function(){o.init()}});return new s});