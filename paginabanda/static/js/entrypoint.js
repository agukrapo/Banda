String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},String.prototype.contains=function(e){return-1!=this.search(e)},require.config({paths:{jquery:"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",underscore:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",bootstrapmodal:"lib/bootstrap-modal-3.3.4.min",echo:"lib/echo-1.6.0.min",backstretch:"//cdnjs.cloudflare.com/ajax/libs/jquery-backstretch/2.0.4/jquery.backstretch.min"}}),require(["banda"],function(e){e.begin()}),requirejs.onError=function(e){console.log(e.stack),require(["views/error"],function(e){e.show()})};