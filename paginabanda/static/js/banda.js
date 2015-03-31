/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("models/basemodel",["backbone"],function(e){return e.Model.extend({isFetched:!1,fetch:function(){options={},options.error=function(e){require(["views/error"],function(n){n.show(e)})};var n=this;return options.success=function(){n.isFetched=!0},e.Model.prototype.fetch.call(this,options)}})}),define("models/fondos",["underscore","backbone","models/basemodel"],function(e,n,t){var i=t.extend({url:"/banda/fondos/"});return new i}),define("models/secciones",["underscore","backbone","models/basemodel"],function(e,n,t){var i=t.extend({url:"/banda/secciones/"});return new i}),define("banda",["jquery","backbone","models/fondos","models/secciones"],function(e,n,t,i){return e.when(t.fetch(),i.fetch()).done(function(){require(["views/navigation"],function(e){e.render()}),require(["router"],function(){n.history.start()});var t=function(){var n=e(window).height();e("section").css("height",n+"px"),e(window).resize(function(){var n=e(window).height();e("section").css("height",n+"px")})};t()}),{begin:function(){}}}),define("loader",["jquery"],function(e){var n,t="#loader";return{show:function(){n=3,e(t).show()},hide:function(){1===n?e(t).fadeOut():n--}}}),define("router",["jquery","backstretch","underscore","backbone","loader","models/fondos","models/secciones"],function(e,n,t,i,o,r,a){var s=i.Router.extend({baseTitle:"basettitle | ",routes:{"":"inicio",inicio:"inicio",nosotros:"nosotros",musica:"musica",videos:"videos",presentaciones:"presentaciones",muro:"muro",contacto:"contacto",fotos:"fotos","*default":"inicio"},inicio:function(){this.common("inicio")},nosotros:function(){this.common("nosotros")},musica:function(){this.common("musica")},videos:function(){this.common("videos")},presentaciones:function(){this.common("presentaciones")},muro:function(){this.common("muro")},contacto:function(){this.common("contacto")},fotos:function(){this.common("fotos")},common:function(e){a.get("inicio")?a.get(e)?(document.title=this.baseTitle+e,o.show(2),require(["views/"+e+"view"],function(e){e.refresh()}),this.transitionTo(e),setTimeout(o.hide,300)):this.inicio():window.location=/maintenance/},transitionTo:function(e){this.setFondo(e),require(["views/navigation"],function(n){n.setActive(e)})},setFondo:function(n){var t=r.get(n),i=new Image;i.src=t,i.onload=o.hide,i.complete&&o.hide(),e("body").backstretch(t)}});return new s}),define("text",["module"],function(e){var n,t,i,o,r,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,l=u&&location.protocol&&location.protocol.replace(/\:/,""),d=u&&location.hostname,f=u&&(location.port||void 0),h={},p=e.config&&e.config()||{};return n={version:"2.0.12",strip:function(e){if(e){e=e.replace(s,"");var n=e.match(c);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,n,t;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;3>n;n+=1){t=a[n];try{e=new ActiveXObject(t)}catch(i){}if(e){a=[t];break}}return e},parseName:function(e){var n,t,i,o=!1,r=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==r&&(!a||r>1)?(n=e.substring(0,r),t=e.substring(r+1,e.length)):n=e,i=t||n,r=i.indexOf("!"),-1!==r&&(o="strip"===i.substring(r+1),i=i.substring(0,r),t?t=i:n=i),{moduleName:n,ext:t,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,i,o){var r,a,s,c=n.xdRegExp.exec(e);return c?(r=c[2],a=c[3],a=a.split(":"),s=a[1],a=a[0],!(r&&r!==t||a&&a.toLowerCase()!==i.toLowerCase()||(s||a)&&s!==o)):!0},finishLoad:function(e,t,i,o){i=t?n.strip(i):i,p.isBuild&&(h[e]=i),o(i)},load:function(e,t,i,o){if(o&&o.isBuild&&!o.inlineText)return void i();p.isBuild=o&&o.isBuild;var r=n.parseName(e),a=r.moduleName+(r.ext?"."+r.ext:""),s=t.toUrl(a),c=p.useXhr||n.useXhr;return 0===s.indexOf("empty:")?void i():void(!u||c(s,l,d,f)?n.get(s,function(t){n.finishLoad(e,r.strip,t,i)},function(e){i.error&&i.error(e)}):t([a],function(e){n.finishLoad(r.moduleName+"."+r.ext,r.strip,e,i)}))},write:function(e,t,i){if(h.hasOwnProperty(t)){var o=n.jsEscape(h[t]);i.asModule(e+"!"+t,"define(function () { return '"+o+"';});\n")}},writeFile:function(e,t,i,o,r){var a=n.parseName(t),s=a.ext?"."+a.ext:"",c=a.moduleName+s,u=i.toUrl(a.moduleName+s)+".js";n.load(c,i,function(){var t=function(e){return o(u,e)};t.asModule=function(e,n){return o.asModule(e,u,n)},n.write(e,c,t,r)},r)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(t=require.nodeRequire("fs"),n.get=function(e,n,i){try{var o=t.readFileSync(e,"utf8");0===o.indexOf("﻿")&&(o=o.substring(1)),n(o)}catch(r){i&&i(r)}}):"xhr"===p.env||!p.env&&n.createXhr()?n.get=function(e,t,i,o){var r,a=n.createXhr();if(a.open("GET",e,!0),o)for(r in o)o.hasOwnProperty(r)&&a.setRequestHeader(r.toLowerCase(),o[r]);p.onXhr&&p.onXhr(a,e),a.onreadystatechange=function(){var n,o;4===a.readyState&&(n=a.status||0,n>399&&600>n?(o=new Error(e+" HTTP status: "+n),o.xhr=a,i&&i(o)):t(a.responseText),p.onXhrComplete&&p.onXhrComplete(a,e))},a.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?n.get=function(e,n){var t,i,o="utf-8",r=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),o)),c="";try{for(t=new java.lang.StringBuffer,i=s.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&t.append(i);null!==(i=s.readLine());)t.append(a),t.append(i);c=String(t.toString())}finally{s.close()}n(c)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,o=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),r="@mozilla.org/windows-registry-key;1"in i,n.get=function(e,n){var t,a,s,c={};r&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{t=i["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream),t.init(s,1,0,!1),a=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream),a.init(t,"utf-8",t.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(t.available(),c),a.close(),t.close(),n(c.value)}catch(u){throw new Error((s&&s.path||"")+": "+u)}}),n}),define("text!template/error.html",[],function(){return'<div class="modal" id="error-msg-modal" tabindex="-1">\n  <div class="modal-dialog">\n    <div class="modal-content alert alert-warning">\n      <p class="text-center">\n        <strong>Mmm... Parece que el servidor est&aacute; teniendo alg&uacute;n problema.</strong>\n      </p>\n      <p class="text-center">Por favor Intent&aacute; de nuevo mas tarde.</p>\n    </div>\n  </div>\n</div>'}),define("views/error",["jquery","bootstrapmodal","text!template/error.html"],function(e,n,t){var i=Backbone.View.extend({template:_.template(t),initialize:function(){this.render()},render:function(){e("body").append(this.template())},show:function(){e("#error-msg-modal").modal()}});return new i}),define("text!template/navigation.html",[],function(){return'\n<div class="container">\n  <div class="navbar-header">\n    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navigation">\n      <span class="sr-only">Abrir men&uacute;</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n  </div>\n\n  <nav id="navigation" class="navbar-collapse collapse">\n    <ul class="nav navbar-nav navbar-right">\n      <li><a href="#inicio">inicio</a></li>\n      <li><a href="#nosotros">nosotros</a></li>\n      <li><a href="#musica">musica</a></li>\n      <li><a href="#videos">videos</a></li>\n      <li><a href="#fotos">fotos</a></li>\n      <li><a href="#muro">muro</a></li>\n      <li><a href="#presentaciones">próximas fechas</a></li>\n      <li><a href="#contacto">contacto</a></li>\n    </ul>\n  </nav>\n</div>'}),define("views/navigation",["jquery","underscore","backbone","router","models/secciones","text!template/navigation.html"],function(e,n,t,i,o,r){var a=t.View.extend({el:"#page-header",template:n.template(r),render:function(){this.$el.html(this.template()),this.setup()},setup:function(){this.$el.find("a").each(e.proxy(this.each,this)).click(e.proxy(this.click,this))},isTransitioning:function(){return void 0!==e("body").attr("transitioningTo")},getSection:function(n){return e(n).attr("href").replace("#","")},each:function(n,t){o.get(this.getSection(t))||e(this).parent().remove()},click:function(e){if(!this.isTransitioning()){var n=this.getSection(e.currentTarget);require(["router"],function(e){e.navigate(n,{trigger:!0})})}e.preventDefault()},setActive:function(e){this.$el.find("li").removeClass("active"),this.$el.find('a[href="#'+e+'"]').parent().addClass("active")}});return new a}),define("views/baseview",["underscore","backbone","loader"],function(e,n,t){return n.View.extend({el:"#contenido",refresh:function(){this.render()},render:function(){this.actualRender(),setTimeout(t.hide,200)},actualRender:function(){}})}),define("views/basedataview",["underscore","backbone","views/baseview"],function(e,n,t){return t.extend({initialize:function(){this.listenTo(this.data,"sync",this.render)},refresh:function(){this.data.isFetched?this.render():this.data.fetch()},actualRender:function(){this.$el.html(this.template({data:this.data,_:e})),this.afterRender()},afterRender:function(){}})}),define("views/collectionview",["views/basedataview"],function(e){return e.extend({nextPage:function(){this.data.next(),this.data.fetch()},previousPage:function(){this.data.previous(),this.data.fetch()},viewableData:function(){return this.data.models}})}),define("collections/basecollection",["backbone"],function(e){return e.Collection.extend({isFetched:!1,fetch:function(){options={},options.error=function(e){require(["views/error"],function(n){n.show(e)})};var n=this;return options.success=function(){n.isFetched=!0},e.Collection.prototype.fetch.call(this,options)}})}),define("collections/pagedcollection",["underscore","backbone","collections/basecollection"],function(e,n,t){return t.extend({current:1,total:void 0,urlPart:"OVERIDE-ME",url:function(){return this.urlPart+"?page="+this.current},parse:function(e){return this.total=e.total,this.current=e.current,e.elements},hasNext:function(){return this.total&&this.current<this.total},next:function(){this.hasNext()&&this.current++},hasPrevious:function(){return this.current>1},previous:function(){this.hasPrevious()&&this.current--}})}),define("useragent",[],function(){var e=window.matchMedia("(min-width: 750px)");return{isMobile:function(){return!e.matches}}});