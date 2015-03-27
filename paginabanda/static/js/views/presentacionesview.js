define("models/presentacion",["underscore","backbone"],function(e,n){return n.Model.extend({})}),define("collections/presentaciones",["underscore","backbone","models/presentacion","collections/basecollection"],function(e,n,t,a){var c=a.extend({model:t,url:"/banda/presentaciones/"});return new c}),define("text!template/presentaciones.html",[],function(){return'\n<div class="container">\n  <header class="page-header">\n    <h1>Proximas fechas</h1>\n  </header>\n\n  <%_.forEach(data.models, function (presentacion) {%>\n\n  <div class="row">\n    <div class="col-md-12">\n      <p class="h2"><%=presentacion.get(\'lugar\')%></p>\n      <p class="h3"><%=presentacion.get(\'descripcion\')%></p>\n      <dl class="dl-horizontal h4">\n        <dt>Direcci&oacute;n</dt>\n        <dd><%=presentacion.get(\'direccion\')%></dd>\n        <dt>Fecha</dt>\n        <dd><%=presentacion.get(\'fecha\')%></dd>\n        <dt>Hora</dt>\n        <dd><%=presentacion.get(\'hora\')%></dd>\n      </dl>\n    </div>\n  </div>\n\n  <%})%>\n</div>'}),define("views/presentacionesview",["underscore","views/basedataview","collections/presentaciones","text!template/presentaciones.html"],function(e,n,t,a){var c=n.extend({data:t,template:e.template(a)});return new c});