window.addEventListener('load', function () {
    var tab_content = document.querySelector('.tab_content');
    var mask = document.querySelector('.mask');
    var tab_content_big1 = document.querySelector('.tab_content_big1');
    tab_content.addEventListener('mousemove',function() {
        mask.style.display = 'block';
        tab_content_big1.style.display = 'block';
    })

    tab_content.addEventListener('mouseleave',function() {
        mask.style.display = 'none';
        tab_content_big1.style.display = 'none';
    })

    // 2.鼠标移动的时候，让黄色的盒子跟着鼠标走
    tab_content.addEventListener('mousemove', function (e) {
        // （1）.计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log(x,y);
        // （2）.减去盒子高度 的一半 就是 mask 盒子的最终 left 和 top 的值了
         
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // （3）.如果 x坐标小于了 0  就让它停在 0 的位置
        // 遮挡层的最大移动距离
        var maskMax = tab_content.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax ){
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax){
            maskY = maskMax;
        }
        // （4）.我们mask移动的距离
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3.大图片的移动距离 = 遮挡层的移动距离 * 大图片的移动距离 / 遮挡层的最大移动距离
        // 获取大图
        var bigImg = document.querySelector('.big_img');
        // 大图片的最大移动距离
        var bigImgMax = bigImg.offsetWidth - tab_content_big1.offsetWidth;
        // 大图片在移动距离内的坐标
        var bigX = maskX * bigImgMax / maskMax;
        var bigY = maskY * bigImgMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})