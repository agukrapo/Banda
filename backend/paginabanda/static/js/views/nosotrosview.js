define("models/nosotros",["models/basemodel"],function(e){return new(e.extend({url:"/banda/nosotros/"}))}),define("text!template/nosotros.html",[],function(){return'\n<div class="container">\n  <div class="whole"><%= data.get(\'texto\') %></div>\n</div>'}),define("views/nosotrosview",["underscore","views/basedataview","models/nosotros","text!template/nosotros.html"],function(e,t,n,o){return new(t.extend({data:n,template:e.template(o)}))});