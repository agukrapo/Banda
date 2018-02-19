{
  baseUrl : 'js',
  paths : {
    jquery : 'empty:',
    underscore : 'empty:',
    backbone : 'empty:',
    magnificpopup : 'empty:',
    echo : 'empty:',
    backstretch : 'empty:',
  },
  modules: [
    {
      name: 'banda',
      include: [
        'router',
        'views/error', 
        'views/navigation',
        'views/baseview',
        'views/basedataview',
        'views/collectionview',
        'collections/basecollection',
        'collections/pagedcollection',
        'useragent'
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
  dir: './dist/js',
}
