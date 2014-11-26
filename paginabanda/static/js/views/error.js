define([ 'jquery', 'bootstrap' ], function($, Bootstrap) {
  return {
    show: function(info) {
      console.log('------> Error');
      console.log(info.stack);
      console.log(info);
      $('#error-msg-modal').modal();
    }    
  };
});