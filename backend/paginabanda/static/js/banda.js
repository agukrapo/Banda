/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("models/basemodel",["backbone"],function(e){return e.Model.extend({isFetched:!1,fetch:function(){options={},options.error=function(e){require(["views/error"],function(t){t.show(e)})};var t=this;return options.success=function(){t.isFetched=!0},e.Model.prototype.fetch.call(this,options)}})}),define("models/fondos",["underscore","backbone","models/basemodel"],function(e,t,n){return new(n.extend({url:"/banda/fondos/"}))}),define("models/secciones",["underscore","backbone","models/basemodel"],function(e,t,n){return new(n.extend({url:"/banda/secciones/",moreThanInicioEnabled:function(){var e=!1;if(this.get("inicio"))for(attribute in this.attributes)"inicio"===attribute||attribute.endsWith("Label")||(e=e||this.get(attribute));return e}}))}),define("banda",["jquery","backbone","models/fondos","models/secciones"],function(e,t,n,i){return e.when(n.fetch(),i.fetch()).done(function(){require(["views/navigation"],function(e){e.render()}),require(["router"],function(e){t.history.start()});!function(){var t=e(window).height()-100;e("section").css("height",t+"px"),e(window).resize(function(){var t=e(window).height();e("section").css("height",t+"px")})}()}),{begin:function(){}}}),define("loader",["jquery"],function(e){var t,n={};return{show:function(i){n[i]||(n[i]=!0,t=3,e("#loader").show())},hide:function(){1===t?(t=void 0,e("#loader").fadeOut()):t--}}}),define("router",["jquery","backstretch","underscore","backbone","loader","models/fondos","models/secciones"],function(e,t,n,i,o,r,s){return new(i.Router.extend({baseTitle:"Banda | ",routes:{"":"inicio",inicio:"inicio",nosotros:"nosotros",musica:"musica",videos:"videos",presentaciones:"presentaciones",muro:"muro",contacto:"contacto",fotos:"fotos","*default":"inicio"},inicio:function(){this.common("inicio")},nosotros:function(){this.common("nosotros")},musica:function(){this.common("musica")},videos:function(){this.common("videos")},presentaciones:function(){this.common("presentaciones")},muro:function(){this.common("muro")},contacto:function(){this.common("contacto")},fotos:function(){this.common("fotos")},common:function(e){s.get("inicio")?s.get(e)?(this.setTitle(e),o.show(e),require(["views/"+e+"view"],function(e){e.refresh()}),this.transitionTo(e),setTimeout(o.hide,300)):this.inicio():window.location=/maintenance/},transitionTo:function(e){this.setFondo(e),require(["views/navigation"],function(t){t.setActive(e)})},setFondo:function(t){var n=r.get(t);if(n){var i=new Image;i.src=n,i.onload=o.hide,i.complete&&o.hide(),e("body").backstretch(n)}else e(":backstretch").data("backstretch")&&e(":backstretch").data("backstretch").destroy(),o.hide()},setTitle:function(e){document.title=this.baseTitle+s.get(e+"Label")}}))}),define("text",["module"],function(e){"use strict";var t,n,i,o,r,s=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,l=u&&location.protocol&&location.protocol.replace(/\:/,""),f=u&&location.hostname,d=u&&(location.port||void 0),h={},p=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(c);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;t<3;t+=1){n=s[t];try{e=new ActiveXObject(n)}catch(e){}if(e){s=[n];break}}return e},parseName:function(e){var t,n,i,o=!1,r=e.indexOf("."),s=0===e.indexOf("./")||0===e.indexOf("../");return-1!==r&&(!s||r>1)?(t=e.substring(0,r),n=e.substring(r+1,e.length)):t=e,i=n||t,r=i.indexOf("!"),-1!==r&&(o="strip"===i.substring(r+1),i=i.substring(0,r),n?n=i:t=i),{moduleName:t,ext:n,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,i,o){var r,s,a,c=t.xdRegExp.exec(e);return!c||(r=c[2],s=c[3],s=s.split(":"),a=s[1],s=s[0],!(r&&r!==n||s&&s.toLowerCase()!==i.toLowerCase()||(a||s)&&a!==o))},finishLoad:function(e,n,i,o){i=n?t.strip(i):i,p.isBuild&&(h[e]=i),o(i)},load:function(e,n,i,o){if(o&&o.isBuild&&!o.inlineText)return void i();p.isBuild=o&&o.isBuild;var r=t.parseName(e),s=r.moduleName+(r.ext?"."+r.ext:""),a=n.toUrl(s),c=p.useXhr||t.useXhr;if(0===a.indexOf("empty:"))return void i();!u||c(a,l,f,d)?t.get(a,function(n){t.finishLoad(e,r.strip,n,i)},function(e){i.error&&i.error(e)}):n([s],function(e){t.finishLoad(r.moduleName+"."+r.ext,r.strip,e,i)})},write:function(e,n,i,o){if(h.hasOwnProperty(n)){var r=t.jsEscape(h[n]);i.asModule(e+"!"+n,"define(function () { return '"+r+"';});\n")}},writeFile:function(e,n,i,o,r){var s=t.parseName(n),a=s.ext?"."+s.ext:"",c=s.moduleName+a,u=i.toUrl(s.moduleName+a)+".js";t.load(c,i,function(n){var i=function(e){return o(u,e)};i.asModule=function(e,t){return o.asModule(e,u,t)},t.write(e,c,i,r)},r)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,i){try{var o=n.readFileSync(e,"utf8");0===o.indexOf("\ufeff")&&(o=o.substring(1)),t(o)}catch(e){i&&i(e)}}):"xhr"===p.env||!p.env&&t.createXhr()?t.get=function(e,n,i,o){var r,s=t.createXhr();if(s.open("GET",e,!0),o)for(r in o)o.hasOwnProperty(r)&&s.setRequestHeader(r.toLowerCase(),o[r]);p.onXhr&&p.onXhr(s,e),s.onreadystatechange=function(t){var o,r;4===s.readyState&&(o=s.status||0,o>399&&o<600?(r=new Error(e+" HTTP status: "+o),r.xhr=s,i&&i(r)):n(s.responseText),p.onXhrComplete&&p.onXhrComplete(s,e))},s.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,i,o=new java.io.File(e),r=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),a="";try{for(n=new java.lang.StringBuffer,i=s.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&n.append(i);null!==(i=s.readLine());)n.append(r),n.append(i);a=String(n.toString())}finally{s.close()}t(a)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,o=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),r="@mozilla.org/windows-registry-key;1"in i,t.get=function(e,t){var n,s,a,c={};r&&(e=e.replace(/\//g,"\\")),a=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream),n.init(a,1,0,!1),s=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream),s.init(n,"utf-8",n.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),s.readString(n.available(),c),s.close(),n.close(),t(c.value)}catch(e){throw new Error((a&&a.path||"")+": "+e)}}),t}),define("text!template/error.html",[],function(){return'<div class="popup-base error-popup">\n  <p class="text-center">\n    <strong>Mmm... Parece que esta p&aacute;gina tiene alg&uacute;n problema.</strong>\n  </p>\n  <p class="text-center">Por favor Intent&aacute; de nuevo mas tarde.</p>\n</div>'}),define("views/error",["jquery","magnificpopup","text!template/error.html"],function(e,t,n){return new(Backbone.View.extend({template:_.template(n),show:function(){var t=this;e.magnificPopup.open({items:{type:"inline",src:t.template()}})}}))}),define("text!template/navigation.html",[],function(){return'\n<nav>\n  <ul>\n    <li><a href="#inicio"></a></li>\n    <li><a href="#nosotros"></a></li>\n    <li><a href="#musica"></a></li>\n    <li><a href="#videos"></a></li>\n    <li><a href="#fotos"></a></li>\n    <li><a href="#muro"></a></li>\n    <li><a href="#presentaciones"></a></li>\n    <li><a href="#contacto"></a></li>\n  </ul>\n</nav>'}),define("views/navigation",["jquery","underscore","backbone","router","models/secciones","text!template/navigation.html"],function(e,t,n,i,o,r){return new(n.View.extend({el:"#page-header",template:t.template(r),render:function(){o.moreThanInicioEnabled()?(this.$el.html(this.template()),this.setup()):this.$el.remove()},setup:function(){this.$el.find("a").each(e.proxy(this.each,this)).click(e.proxy(this.click,this))},getSection:function(t){return e(t).attr("href").replace("#","")},each:function(t,n){var i=this.getSection(n);o.get(i)?e(n).html(o.get(i+"Label")):e(n).parent().remove()},click:function(e){if(!this.isActive(e.currentTarget)){var t=this.getSection(e.currentTarget);require(["router"],function(e){e.navigate(t,{trigger:!0})})}e.preventDefault()},isActive:function(t){return e(t).parent().hasClass("active")},setActive:function(e){this.$el.find("li").removeClass("active"),this.$el.find('a[href="#'+e+'"]').parent().addClass("active")}}))}),define("views/baseview",["underscore","backbone","loader"],function(e,t,n){return t.View.extend({el:"#contenido",refresh:function(){this.render()},render:function(){this.actualRender(),setTimeout(n.hide,200)},actualRender:function(){}})}),define("views/basedataview",["underscore","backbone","views/baseview"],function(e,t,n){return n.extend({initialize:function(){this.listenTo(this.data,"sync",this.render)},refresh:function(){this.data.isFetched?this.render():this.data.fetch()},actualRender:function(){this.$el.html(this.template({data:this.data,_:e})),this.afterRender()},afterRender:function(){}})}),define("views/collectionview",["views/basedataview"],function(e){return e.extend({nextPage:function(){this.data.next(),this.data.fetch()},previousPage:function(){this.data.previous(),this.data.fetch()},viewableData:function(){return this.data.models}})}),define("collections/basecollection",["backbone"],function(e){return e.Collection.extend({isFetched:!1,fetch:function(){options={},options.error=function(e){require(["views/error"],function(t){t.show(e)})};var t=this;return options.success=function(){t.isFetched=!0},e.Collection.prototype.fetch.call(this,options)}})}),define("collections/pagedcollection",["underscore","backbone","collections/basecollection"],function(e,t,n){return n.extend({current:1,size:void 0,total:void 0,urlPart:"OVERIDE-ME",url:function(){return this.urlPart+this.buildPageUrlPart()+this.buildSizeUrlPart()},buildPageUrlPart:function(){return"?page="+this.current},buildSizeUrlPart:function(){return this.size?"&size="+this.size:""},parse:function(e){return this.total=e.total,this.current=e.current,e.elements},hasNext:function(){return this.total&&this.current<this.total},next:function(){this.hasNext()&&this.current++},hasPrevious:function(){return this.current>1},previous:function(){this.hasPrevious()&&this.current--}})}),define("useragent",[],function(){var e=window.matchMedia("(min-width: 750px)");return{isMobile:function(){return!e.matches}}});