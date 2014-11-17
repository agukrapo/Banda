comentariodefine([ 'underscore', 'backbone' ], function(_, Backbone) {
  return Backbone.Model.extend({
    url: '/banda/comentario/',
    validate: function(attrs, options) {
      var errors = [];
      var autorResult = this.validateAutor(attrs.autor);
      if (autorResult) {
        errors.push({name: 'autor', msg: autorResult});
      }
      var comentarioResult = this.validateComentario(attrs.comentario);
      if (comentarioResult) {
        errors.push({name: 'comentario', msg: comentarioResult});
      }
      return errors.length > 0? errors: false;
    },
    validateAutor: function(autor) {
      return this.commonValidate(autor, 100);
    },
    validateComentario: function(comentario) {
      return this.commonValidate(comentario, 2000);
    },
    commonValidate: function(value, length) {
      if (!value) {
        return 'Requerido.';
      }
      if (value.length > length) {
        return 'Máximo ' + length + ' letras.';
      }
    }
  });
});