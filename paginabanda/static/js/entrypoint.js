String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.contains = function(fragment) {
  return this.search(fragment) != -1;
}

require.config({
  paths : {
    jquery : 'lib/jquery-1.11.1.min',
    underscore : 'lib/underscore-1.7.0.min',
    backbone : 'lib/backbone-1.1.2.min',
    bootstrap : 'lib/bootstrap-3.3.1.min',
    echo : 'lib/echo-1.6.0.min',
    backstretch : 'lib/jquery-backstretch-2.0.4.min',
  }
});

require([ 'banda' ], function(Banda) {
  Banda.begin();
});

requirejs.onError = function (err) {
  require(['views/error'], function (error) {
    error.show();
  });
};