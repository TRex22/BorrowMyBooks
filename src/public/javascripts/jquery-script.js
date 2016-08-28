$(document).ready(function() {
   $('.selectpicker').selectpicker();
});

$(window).on('beforeunload', function(){
    socket.close();
});