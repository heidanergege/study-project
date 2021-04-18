(function flexible(window, document) {
    //1.获取 HTML的根元素
    var docEl = document.documentElement
        // 获取物理像素比
    var dpr = window.devicePixelRatio || 1

    //2. adjust body font size  设置body的字体大小
    function setBodyFontSize() {
        // 如果页面中有body这个元素 就设置 body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 否则 就 等着 页面主要的DOM元素加载完毕 再去设置 body 的字体大小
            document.addEventListener('DOMContentLoaded',setBodyFontSize)
        }
    }
    setBodyFontSize();

    //3.set 1rem = viewWidth / 10  设置 HTML 元素的文字大小 也就是设置1rem宽度为视口宽度的十分之一
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }
    setRemUnit();

    // 4.reset rem unit on page resize  当页面尺寸大小发生变化的时候，重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
    //pageshow 是重新加载页面时触发的事件 和 load 的区别是在火狐中按后退 按钮也会重新加载页面
    window.addEventListener('pageshow', function (e) {
        // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下 rem 的大小
        if (e.persisted) {
            setRemUnit()
        }
    })

    // 5.detect 0.5px supports 有些移动端的浏览器不支持0.5 像素的写法
    if (dpr >= 2) {
        // 创造元素
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '0.5px soild transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
} (window,document))