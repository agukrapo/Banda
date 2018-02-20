define("models/comentario",["models/basemodel"],function(e){return e.extend({url:"/banda/comentario/",validate:function(e,t){var o=[],n=this.validateAutor(e.autor);n&&o.push({name:"autor",msg:n});var i=this.validateComentario(e.comentario);return i&&o.push({name:"comentario",msg:i}),o.length>0&&o},validateAutor:function(e){return this.commonValidate(e,100)},validateComentario:function(e){return this.commonValidate(e,2e3)},commonValidate:function(e,t){return e?e.length>t?"Máximo "+t+" letras.":void 0:"Requerido."}})}),define("collections/muro",["underscore","backbone","models/comentario","collections/pagedcollection"],function(e,t,o,n){return new(n.extend({model:o,urlPart:"/banda/muro/"}))}),define("text!template/comentarioform.html",[],function(){return'<div id="comentario-modal" class="modal" tabindex="-1">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-body">\n        <form>\n          <div class="form-group autor">\n            <label class="control-label h3" for="autor-field">Autor</label>\n            <input id="autor-field" type="text" class="form-control"><% comentario.get(\'autor\') %></input>\n            <span class="help-block"></span>\n          </div>\n          <div class="form-group comentario">\n            <label class="control-label h3" for="comentario-field">Comentario</label>\n            <textarea id="comentario-field" rows="3" class="form-control"><% comentario.get(\'comentario\') %></textarea>\n            <span class="help-block"></span>\n          </div>\n          <button id="submit-comentario-form" type="submit" class="btn btn-default">Agregar comentario</button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>'}),define("views/comentarioform",["jquery","underscore","backbone","magnificpopup","models/comentario","text!template/comentarioform.html"],function(e,t,o,n,i,a){return new(o.View.extend({template:t.template(a),events:{submit:"submitMe"},render:function(){return this.model=new i,this.$el.html(this.template({comentario:this.model,_:t})),this.hideErrors(),this},submitMe:function(e){e.preventDefault(),this.model.set("autor",this.$("#autor-field").val()),this.model.set("comentario",this.$("#comentario-field").val()),this.model.isValid()?(this.model.save(),this.hideForm(),this.view.render()):(this.hideErrors(),this.showErrors())},showForm:function(t){this.view=t,e("#comentario-modal").modal("show")},hideForm:function(){e("#comentario-modal").modal("hide")},showErrors:function(){t.each(this.model.validationError,function(t){e("."+t.name).addClass("has-error").find(".help-block").show().text(t.msg)},this)},hideErrors:function(){this.$(".form-group").removeClass("has-error").find(".help-block").hide().text("")}}))}),define("text!template/muro.html",[],function(){return'<div class="container">\n  <button id="add-comentario" class="btn btn-default btn-center">Dejar un comentario</button>\n</div>\n\n<div class="container">\n  <% _.forEach(data.models, function (comentario, i) { %>\n\n  <div class="comentario half">\n    <p class="texto"><%-comentario.get(\'texto\')%></p>\n    <p class="autor"><%-comentario.get(\'autor\')%></p>\n  </div>\n\n  <% }) %>\n</div>\n\n<%if (data.hasPrevious() || data.hasNext()) {%>\n<footer class="container">\n\n  <%if (data.hasPrevious()) {%>\n  <button id="previous-muro-page" class="btn btn-default pull-left">Comentarios M&aacute;s Nuevos</button>\n  <% } %>\n  <%if (data.hasNext()) {%>\n  <button id="next-muro-page" class="btn btn-default pull-right">Comentarios M&aacute;s Viejos</button>\n  <% } %>\n\n</footer>\n<% } %>'}),define("views/muroview",["underscore","views/collectionview","collections/muro","views/comentarioform","text!template/muro.html"],function(e,t,o,n,i){return new(t.extend({el:"#contenido",template:e.template(i),data:o,form:n,events:{"click #next-muro-page":"nextPage","click #previous-muro-page":"previousPage","click #add-comentario":"showForm"},showForm:function(){this.form.render(),this.$el.append(this.form.$el),this.form.showForm(this)}}))});