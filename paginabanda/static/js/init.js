require.config({
  paths : {
    jquery : 'static/js/lib/jquery-1.11.1.min.js',
    underscore : 'static/js/lib/underscore-1.7.0.min.js',
    backbone : 'static/js/lib/backbone-1.1.2.min.js',
    bootstrap : 'static/js/lib/bootstrap-3.3.1.min.js',
    echo : 'static/js/lib/echo-1.6.0.min.js',
    backstretch : 'static/js/lib/jquery-backstretch-2.0.4.min.js',
  }
});

require([ 'banda' ], function(Banda) {
  Banda.initialize();
});