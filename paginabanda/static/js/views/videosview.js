define("views/videoview",["jquery","underscore","magnificpopup","backbone"],function(e,i,n,t,o){return t.View.extend({render:function(){var i=this;e.magnificPopup.open({items:{src:i.model.get("url")},type:"iframe",iframe:{cursor:null,titleSrc:function(e){return i.model.get("nombre")},patterns:{youtube_short:{index:"youtu.be/",id:"youtu.be/",src:"//www.youtube.com/embed/%id%?autoplay=1"}}}})}})}),define("models/video",["models/basemodel"],function(e){return e.extend({parse:function(e,i){var n="",t=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,o=e.url.match(t);return o&&(n=o[7]),e.thumbnail="//img.youtube.com/vi/"+n+"/0.jpg",e.embed="//www.youtube.com/embed/"+n,e}})}),define("collections/videos",["models/video","collections/pagedcollection"],function(e,i){var n=i.extend({model:e,urlPart:"/banda/videos/"});return new n}),define("text!template/videos.html",[],function(){return'\n<div class="container">\n  <%_.forEach(data.models, function (video, i) {%>\n\n  <div class="third">\n    <a id="<%=i%>" class="video thumbnail" href="<%=video.get(\'url\')%>" title="<%=video.get(\'nombre\')%>"> \n      <img src="/static/img/img_load.gif" class="img-responsive" alt="<%=video.get(\'nombre\')%>" data-echo="<%=video.get(\'thumbnail\')%>">\n      <div class="thumbnail-info">\n        <p><%=video.get(\'nombre\')%></p>\n      </div>\n    </a>\n  </div>\n\n  <%})%> \n\n</div>\n\n<%if (data.hasPrevious() || data.hasNext()) {%>\n<footer class="container">\n\n  <%if (data.hasPrevious()) {%>\n  <button id="previous-videos-page" class="pull-left">Videos M&aacute;s Nuevos</button>\n  <% } %>\n  <%if (data.hasNext()) {%>\n  <button id="next-videos-page" class="pull-right">Videos M&aacute;s Viejos</button>\n  <% } %>\n\n</footer>\n<% } %>'}),define("views/videosview",["underscore","echo","useragent","views/collectionview","views/videoview","collections/videos","text!template/videos.html"],function(e,i,n,t,o,a,d){var s=t.extend({data:a,template:e.template(d),events:{"click .video":"openModal","click #next-videos-page":"nextPage","click #previous-videos-page":"previousPage"},afterRender:function(){i.init()},openModal:function(e){e.preventDefault();var i=this.data.models[e.currentTarget.id];if(n.isMobile())window.location=i.get("url");else{var t=new o;t.model=i,t.render()}}});return new s});