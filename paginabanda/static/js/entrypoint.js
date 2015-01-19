String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.contains = function(fragment) {
  return this.search(fragment) != -1;
}

require.config({
  paths : {
    jquery : '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
//    jquery : 'lib/jquery-1.11.1.min',
    underscore : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
//    underscore : 'lib/underscore-1.7.0.min',
    backbone : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
//    backbone : 'lib/backbone-1.1.2.min',
    bootstrap : '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',
//    bootstrap : 'lib/bootstrap-3.3.1.min',
    echo : 'lib/echo-1.6.0.min',
//    echo : 'lib/echo-1.6.0.min',
    backstretch : '//cdnjs.cloudflare.com/ajax/libs/jquery-backstretch/2.0.4/jquery.backstretch.min',
//    backstretch : 'lib/jquery-backstretch-2.0.4.min',
  }
});

require([ 'banda' ], function(Banda) {
  Banda.begin();
});

requirejs.onError = function (info) {
  console.log(info.stack);
  require(['views/error'], function (error) {
    error.show();
  });
};