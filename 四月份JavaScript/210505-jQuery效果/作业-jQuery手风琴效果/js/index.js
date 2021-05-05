$(function () {
    $(".box li").mouseenter(function () {
        $(this).stop().animate({
            width: 538,
            opacity: 1
        }).siblings("li").stop().animate({
            width: 100,
            opacity: .4
        });
    });
    $(".box ul").mouseleave(function () {
        $(this).children("li").stop().animate({
            width: 173,
            opacity:.4
        })
    })
})