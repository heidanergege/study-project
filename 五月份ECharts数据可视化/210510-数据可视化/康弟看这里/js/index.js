$(function () {


    /* 订单数据模块 */
    (function () {

        // 1. 点击实现tab栏切换样式
        // 绑定点击事件
        $(".order .filter").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            $(".order .data").eq($(this).index()).show().siblings(".data").hide();
        });
        // 2. 开启定时器动态切换数据内容
        var index = $(this).index();
        console.log(index);
        var allTab = $(".order .filter a");

        // 3.当鼠标经过时清除定时器
        $(".order").mouseenter(function () {
            clearInterval(timer);
            timer = null;
        });
        $(".order").mouseleave(function () {
            timer = setInterval(function () {
                index++;
                index >= 4 ? index = 0 : index;
                allTab.eq(index).click();
            }, 2000);
        });
        var timer = setInterval(function () {
            index++;
            index >= 4 ? index = 0 : index;
            allTab.eq(index).click();
        }, 2000);
    })();


})