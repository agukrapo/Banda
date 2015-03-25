{
  baseUrl : 'js',
  paths : {
    jquery : 'empty:',
    underscore : 'empty:',
    backbone : 'empty:',
    bootstrap : 'empty:',
    echo : 'lib/echo-1.6.0.min',
    backstretch : 'empty:',
  },
  modules: [
    {
      name: 'banda',
      include: [
        'router',
        'views/error', 
        'views/navigation',
        'views/basedataview',
        'views/collectionview',
        'collections/basecollection',
        'collections/pagedcollection',
        'lib/echo-1.6.0.min.js'
      ],
    },
    {
      name: 'views/inicioview',
      exclude: ['banda']
    },
    {
      name: 'views/nosotrosview',
      exclude: ['banda']
    },
    {
      name: 'views/musicaview',
      exclude: ['banda']
    },
    {
      name: 'views/videosview',
      exclude: ['banda']
    },
    {
      name: 'views/fotosview',
      exclude: ['banda']
    },
    {
      name: 'views/muroview',
      exclude: ['banda']
    },
    {
      name: 'views/presentacionesview',
      exclude: ['banda']
    },
    {
      name: 'views/contactoview',
      exclude: ['banda']
    },
  ],
  optimize: 'uglify2',
  removeCombined: true,
  dir: './dist/',
}
