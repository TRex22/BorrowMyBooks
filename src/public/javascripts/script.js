function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}



//bower libraries are here for now
/*loadScript("../../bower_components/jquery/dist/jquery.min.js");
loadScript("../../bower_components/bootstrap/dist/js/bootstrap.min.js");
loadScript("../../bower_components/bootstrap-select/dist/js/bootstrap-select.min.js");*/


/*

document.ready(function(){
    document.getElementsByTagName('[data-toggle="tooltip"]').tooltip();   
});

document.getElementsByTagName('.selectpicker').selectpicker('show');*/
