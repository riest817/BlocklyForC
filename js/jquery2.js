$(document).ready( function() {
    var speed = 1000;
    var menu = $('div#floating-menu');
    var offset = menu.offset().top; // フローティングメニューの位置
        
    //スクロール時のイベント処理
    $(window).scroll(function(){
        var scrollAmount = $(window).scrollTop();
        var newPosition = offset + scrollAmount;

        menu.stop().animate({top: newPosition}, speed);
    });
});