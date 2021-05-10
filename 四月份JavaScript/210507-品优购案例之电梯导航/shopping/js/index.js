// 1.页面加载完成后启用js
window.addEventListener('load', function () {
    // 2.获取元素
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;
    
    // 3.鼠标经过轮播图，左右按钮显示，鼠标离开就隐藏
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
       timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    // 4.动态生成小圆圈，有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 遍历ul 的所有孩子
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li      
        var li = document.createElement('li');
        // 记录当前小li 的 索引号 通过添加自定义属性来得到
        li.setAttribute('index', i);
        // 把小li插入到 ol 里面
        ol.appendChild(li);
        // 5.小圆圈的排他思想，在生成小圆圈的同时直接绑定事件
        li.addEventListener('click', function () {
            // 先干掉所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 再留下自己
            this.className = 'current';
            // 6.点击小圆圈，移动图片 注意 移动的是 ul 而不是 li
            // ul 移动距离的算法：小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到了当前小 li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就把这个小li 的索引号 给 num 就好了
            num = index;
            // 当我们点击了某个小li 就把这个小li 的索引号 给 circle 就好了
            circle = index;
            // 调用封装好的动画函数
            animate(ul, -index * focusWidth);

        })
    }
    // 给 ol 里第一个 孩子 添加 current 的 类名
    ol.children[0].className = 'current';
    // 7.克隆第一张图片（li）放到最后面
    var clone = ul.children[0].cloneNode(true);
    ul.appendChild(clone);
    // 8.点击右侧按钮，滚动轮播图一张
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 9.点击右侧按钮，小圆圈跟随一起变化，需要先声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后一张克隆的图片了 就需要复原 
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除其余小圆圈的类名 排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的current 类名
            ol.children[circle].className = 'current';
        }
    })
    
    // 10.左侧按钮的做法
    arrow_l.addEventListener('click', function () {
        //节流阀
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 9.点击左侧按钮，小圆圈跟随一起变化，需要先声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0 说明走到第一张图片了 小圆圈就需要改为 第四个
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 先清除其余小圆圈的类名 排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的current 类名
            ol.children[circle].className = 'current';
        }
    })
    // 10.自动播放轮播图功能  此功能写到鼠标经过，离开的事件里面
    var timer = setInterval(function () {
        // 手动调用某个元素的点击事件
        arrow_r.click();
    },2000)
});
// jQuery入口函数
$(function () {
    // 电梯导航start
    var flag = true;
    //  1.页面滚动事件  

    $(window).scroll(function () {
        var likeTop = $(".like").offset().top;
        if ($(document).scrollTop() >= likeTop) {
            $(".elevator-nav").fadeIn();
        } else {
            $(".elevator-nav").fadeOut();
        };
        if (flag) {
            $(".floor .w").each(function (i, ele) {           
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".elevator-nav li").eq(i).addClass("current").siblings().removeClass();
                }
    
            })
        }

    });
    // 2.电梯导航栏点击事件
    $(".elevator-nav li").click(function () {
        flag = false;
        var i = $(this).index();
        // $(".floor w").eq(i).offset().top; //点击那个li 就得到当前li对应索引号的div 距离文档头部的距离
        //页面滚动动画
        $("body, html").stop().animate({
            scrollTop: $(".floor .w").eq(i).offset().top
        },function () {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass("current");
    })
    
    // 电梯导航end
})
