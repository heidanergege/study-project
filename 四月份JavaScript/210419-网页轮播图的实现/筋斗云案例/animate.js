        // 缓动动画函数封装 obj(目标对象), target(目标位置)
        // 实现思路：
        // 1.让盒子每次移动的距离慢慢变小
        // 2. 核心算法(公式)：(目标值 - 现在的位置) / 10  得出每次移动的步长
        // 3.停止的条件是：让当前盒子的位置 等于 目标位置 解停止定时器
        function animate(obj, target, callback) {
            //bug ：当我们不断的点击按钮，相当于开启了太多的定时器，这个元素的速度会越来越快
            // 解决方法：先清除以前的定时器，让元素只有一个定时器执行 如下：
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                // 步长公式因为有 现在的位置 的参数 所以要写到定时器里面
                // 步长值改为整数，不要出现小数，否则就不准了 Math.ceil()
                // 先声明一个变量
                var step = (target - obj.offsetLeft) / 10;
                // 考虑盒子需要向左移动 也就是 步长为负值，此时就需要往小取整 Math.floor()
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    //停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 如果callback 为 true 则调用名为 callback 的这个函数
                    // if (callback) {
                    //     callback();
                    // }
                    // 写法二：
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15)
        }
        
                // 缓动动画函数封装 obj(目标对象), target(目标位置)
        // 实现思路：
        // 1.让盒子每次移动的距离慢慢变小
        // 2. 核心算法(公式)：(目标值 - 现在的位置) / 10  得出每次移动的步长
        // 3.停止的条件是：让当前盒子的位置 等于 目标位置 解停止定时器
        function animateTop(obj, target, callback) {
            //bug ：当我们不断的点击按钮，相当于开启了太多的定时器，这个元素的速度会越来越快
            // 解决方法：先清除以前的定时器，让元素只有一个定时器执行 如下：
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                // 步长公式因为有 现在的位置 的参数 所以要写到定时器里面
                // 步长值改为整数，不要出现小数，否则就不准了 Math.ceil()
                // 先声明一个变量
                var step = (target - obj.offsetTop) / 10;
                // 考虑盒子需要向左移动 也就是 步长为负值，此时就需要往小取整 Math.floor()
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetTop == target) {
                    //停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 如果callback 为 true 则调用名为 callback 的这个函数
                    if (callback) {
                        callback();
                    }
                }
                obj.style.top = obj.offsetTop + step + 'px';
            }, 15)
        }