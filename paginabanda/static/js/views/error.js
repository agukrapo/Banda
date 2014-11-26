define([ 'jquery', 'bootstrap' ], function($, Bootstrap) {
  return {
    show: function(info) {
      console.log('------> Error', info);
      $('#error-msg-modal').modal();
    }    
  };
});