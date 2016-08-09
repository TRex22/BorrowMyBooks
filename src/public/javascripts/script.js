$(window).on('beforeunload', function(){
    socket.close();
});