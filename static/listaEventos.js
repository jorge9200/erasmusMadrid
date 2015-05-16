$(function(){
    $.get('/lista', function(data){
        $("#title").html(data[0]);
        $("#description").html(data[1]);
        //$("#time").html(data[2]);
        //$("#address").html(data[3]);
    });
});