var main = function(){
    $('#config').click(function() {
        $('.menu').animate({
            left: '0px'
        }, 200);
        $('#wrapper').animate({
            left: '285px'
        }, 200);
    });
    
    $('.icon-close').click( function(){
        $('.menu').animate({
            left: '-285px'
            }, 200);
        $('#wrapper').animate({
            left: '0px'
        }, 200);
    });
};

$(document).ready(main);