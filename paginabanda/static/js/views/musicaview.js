define("models/album",["models/basemodel"],function(n){return n.extend({})}),define("collections/musica",["models/album","collections/basecollection"],function(n,a){var e=a.extend({model:n,url:"/banda/musica/"});return new e}),define("text!template/musica.html",[],function(){return'\n<div class="container">\n  <header class="page-header">\n    <h1>Musica</h1>\n  </header>\n\n  <%_.forEach(data.models, function (album, i) {%>\n\n  <div class="row">\n    <div class="col-md-6">\n      <div class="thumbnail">\n        <img src="/static/img/img_load.gif" class="img-responsive" data-echo="<%=album.get(\'tapa\')%>" alt="Tapa de <%=album.get(\'nombre\')%>">\n      </div>\n    </div>\n    <div class="col-md-6">\n      <h2><%=album.get(\'nombre\')%></h2>\n      <p class="h4"><%=album.get(\'descripcion\')%></p>\n      <ol>\n        <%_.forEach(album.get(\'canciones\'), function (cancion, j) {%>\n        \n        <li><% if (cancion.url && cancion.url.contains(\'soundcloud\')) { %> <a href="#" data-toggle="modal" data-target="#myModal<%=i%><%=j%>"> <%=cancion.nombre%> </a> <% } else if (cancion.url) { %> <a href="<%=decodeURIComponent(cancion.url)%>"> <%=cancion.nombre%> </a> <% } else { %>\n          <p class="cancion"><%=cancion.nombre%></p> <% } %>\n        </li> <% if (cancion.url && cancion.url.contains(\'soundcloud\')) { %>\n        \n        <div class="modal" id="myModal<%=i%><%=j%>" tabindex="-1">\n          <div class="modal-dialog">\n            <div class="modal-content">\n              <div class="modal-body">\n                <iframe width="558" src="//w.soundcloud.com/player/?url=<%=cancion.url%>" frameborder="0" allowfullscreen></iframe>\n              </div>\n            </div>\n          </div>\n        </div>\n        \n        <% } %> <%})%>\n      </ol>\n    </div>\n  </div>\n  <%})%>\n</div>'}),define("views/musicaview",["underscore","echo","bootstrapmodal","views/collectionview","collections/musica","text!template/musica.html"],function(n,a,e,i,c,o){var l=i.extend({data:c,template:n.template(o),afterRender:function(){a.init()}});return new l});