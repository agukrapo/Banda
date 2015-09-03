String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.contains = function(fragment) {
  return this.search(fragment) != -1;
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

require.config({
  paths : {
    jquery : '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
    underscore : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
    backbone : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    magnificpopup : 'lib/magnific-popup.min',
    echo : 'lib/echo.min',
    backstretch : '//cdnjs.cloudflare.com/ajax/libs/jquery-backstretch/2.0.4/jquery.backstretch.min',
  },
  shim: {
    'magnificpopup': ['jquery']
  }
});

requirejs.onError = function (info) {
  console.log(info.stack);
  require(['views/error'], function (error) {
    error.show();
  });
};

require([ 'banda' ], function(Banda) {
  Banda.begin();
});
