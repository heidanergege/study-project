$(function () {
    //监控区域模块
    (function () {
        //1. tab 栏切换功能
        //  给tabs 标签栏 绑定 点击事件
        $(".monitor .tabs").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            // 获取当前点击a 的索引号
            // console.log($(this).index());
            // 选取对应索引号的content 内容显示 其余隐藏
            $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
        });
        // 2.向上循环滚动效果
        // 实现思路：
        // js 部分
        // 先克隆列表，然后追加到后面
        // css 部分：
        // marquee - view 占满剩余高度 溢出隐藏
        // 绝对定位， top 1.6rem bottom 0
        // 宽度100 % 溢出隐藏
        // 使用animation 实现动画
        // 使用translateY 向上位移 50 %
        // 动画时间 15s 匀速播放 循环执行  
        $(".marquee-view .marquee").each(function () {
            // console.log($(this));
            var rows = $(this).children().clone();
            $(this).append(rows);
        });
    })();


    //点位分布统计图模块
    (function () {
        // 1.引入ECharts.js 文件
        // 2.创建具有大小的元素容器 （pie）
        // 3.实例化对象
        var myChart = echarts.init(document.querySelector(".pie"));
        // 4.指定配置和数据
        var option = {

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            //颜色书写的位置
            color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],

            series: [

                {
                    name: '点位统计',
                    type: 'pie',
                    radius: ['6%', '60%'],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [{
                            value: 20,
                            name: '北京'
                        },
                        {
                            value: 26,
                            name: '云南'
                        },
                        {
                            value: 24,
                            name: '山东'
                        },
                        {
                            value: 25,
                            name: '浙江'
                        },
                        {
                            value: 20,
                            name: '河北'
                        },
                        {
                            value: 25,
                            name: '江苏'
                        },
                        {
                            value: 30,
                            name: '四川'
                        },
                        {
                            value: 42,
                            name: '湖南'
                        }
                    ],
                    label: {
                        fontSize: 12
                    },
                    labelLine: {

                        length: 6
                    }
                }
            ]
        };
        // 5.把配置和数据给实例化对象
        myChart.setOption(option);
        // 6.当浏览器尺寸大小发生变化的时候，图表的大小也跟着发生变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();

    // 全国用户统计模块柱形图表效果
    (function () {
        // 中间几个灰色柱子的变量
        var item = {
            name: '',
            value: '1200',
            itemStyle: { //修改当前柱形的样式
                color: '#254065'
            },

            emphasis: { //鼠标经过当前柱子不想高亮显示
                itemStyle: {
                    color: '#254065'
                }
            },
            //鼠标经过柱子 不显示提示框组件
            tooltip: {
                extraCssText: "opacity: 0"

            }
        };
        // 1.实例化对象
        var myChart = echarts.init(document.querySelector(".bar"));
        // 2.指定配置项和数据
        var option = {
            // 修改线性渐变色方式 1
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1,
                [{
                        offset: 0,
                        color: '#00fffb'
                    }, // 0 起始颜色
                    {
                        offset: 1,
                        color: '#0061ce'
                    } // 1 结束颜色
                ]
            ),
            tooltip: {
                trigger: 'item',
            },
            grid: {
                left: '0%',
                right: '2%',
                bottom: '3%',
                top: '4%',
                containLabel: true,
                show: true,
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            xAxis: [{
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    alignWithLabel: false, //决定x轴的名称的对齐位置
                    show: false, //把x轴的刻度隐藏起来
                },
                axisLabel: { //修改x 轴的文字样式
                    color: '#4c9bfd',
                    fontSize: 8
                },
                //x 轴这条线的样式
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false, //把y轴的刻度隐藏起来
                },
                axisLabel: { //修改y 轴的文字样式
                    color: '#4c9bfd'
                },
                //y 轴这条线的样式
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
                // y 轴分割线的样式
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }

            }],

            series: [{
                name: '用户总量',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }]
        };
        // 3.把配置项和数据给实例化对象
        myChart.setOption(option);
        // 4.当浏览器窗口大小变化时，图表大小也同步进行变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();

    // 订单数据模块
    (function () {
        // 1. 点击实现tab栏切换样式
        // 绑定点击事件
        $(".order .filter").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            index = $(this).index();
            $(".order .data").eq(index).show().siblings(".data").hide();
        });
        // 2. 开启定时器动态切换数据内容
        var allTab = $(".order .filter a");
        var index = 0;

        // 3.当鼠标经过时清除定时器
        $(".order").mouseenter(function () {
            clearInterval(timer);
            timer = null;
        });
        $(".order").mouseleave(function () {
            clearInterval(timer);
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


    // 销售额统计模块
    (function () {
        // 1.准备切换需要依赖的数据  4组
        var data = {
            year: [
                ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                [24, 40, 101, 134, 90, 230, 210],
                [40, 64, 191, 324, 290, 330, 310]
            ],
            quarter: [
                ['第一季度', '第二季度', '第三季度', '第四季度'],
                [23, 75, 12, 97],
                [43, 31, 65, 23]
            ],
            month: [
                ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                [43, 73, 62, 54, 91, 54, 84],
                [32, 54, 34, 87, 32, 45, 62]
            ]
        }
        // 1.实例化对象
        var myChart = echarts.init(document.querySelector(".sales .line"));
        // 2.指定配置和数据
        var option = {
            color: ['#00f2f1', '#ed3f35'],

            tooltip: {
                //通过坐标轴来触发
                trigger: 'axis'
            },
            legend: {
                // 如果series 里面设置了name，此时图例组件的data 可以省略 否则就要和下面一样
                // data: ['邮件营销', '联盟广告'],
                //修改位置
                right: '5%',
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            grid: {
                top: '20%',
                left: 0,
                right: '5%',
                bottom: '3%',
                show: true,
                borderColor: '#012f4a',
                containLabel: true
            },

            xAxis: {
                type: 'category',
                boundaryGap: false, // 图线顶到y轴
                data: data.year[0],
                axisTick: {
                    show: false //去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd', //修改x轴文本颜色
                    fontSize: 8
                },
                axisLine: {
                    show: false //去除轴线
                }

            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false //去除刻度
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a' // 分割线的颜色z
                    }
                }
            },
            series: [{
                    name: '预期销售额',
                    type: 'line',
                    stack: '总量',
                    smooth: true, //折线修饰为圆滑
                    data: data.year[1]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    stack: '总量',
                    smooth: true, //折线修饰为圆滑
                    data: data.year[2]
                }
            ]
        };
        // 3.把配置项和数据给实例化对象
        myChart.setOption(option);
        // 销售图表的tab 栏切换效果
        // 1.准备切换需要依赖的数据  4组
        // (数据声明在前面)
        // 2.绑定点击事件
        $(".sales .caption").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            index = $(this).index() - 1;
            // data["year"];// 获取对象里属性的值
            // console.log(data.year);// 获取对象里属性的值
            //拿到当前 a  的自定义属性 的值
            // console.log(this.dataset.type);
            // console.log(data[this.dataset.type]);
            var arr = data[this.dataset.type];
            // 3.激活切换tab 的样式
            // 4.切换图表依赖的数据（重新渲染图表 swries 里的 data 的值）
            option.xAxis.data = arr[0];
            option.series[0].data = arr[1];
            option.series[1].data = arr[2];
            // 把配置好的新的数据重新给实例化对象
            myChart.setOption(option);

        })

        // 5.开启定时器，进行切换，、鼠标经过sales 停止定时器，离开开启定时器
        var as = $(".sales .caption a");
        var index = 0;
        var timer = setInterval(function () {
            index++;
            index >= 4 ? index = 0 : index;
            as.eq(index).click();
        }, 2000);
        $(".sales").hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                index >= 4 ? index = 0 : index;
                as.eq(index).click();
            }, 2000);
        });

        // 4.当浏览器窗口大小变化时，图表大小也同步进行变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();

    // 渠道分布和销售进度模块
    // 渠道分布模块
    (function () {
        // 1.实例化对象
        var myChart = echarts.init(document.querySelector(".radar"));
        // 2.指定配置

        var option = {
            tooltip: {
                show: true,
                //设置提示框组件的显示位置
                position: ['60%', '10%']
            },
            radar: {
                indicator: [{
                        name: '机场',
                        max: 100
                    },
                    {
                        name: '商场',
                        max: 100
                    },
                    {
                        name: '火车站',
                        max: 100
                    },
                    {
                        name: '汽车站',
                        max: 100
                    },
                    {
                        name: '地铁',
                        max: 100
                    }
                ],
                radius: "54%", //修改外半径占据父容器的大小
                shape: 'circle',
                splitNumber: 4, // 分割的圆圈的个数
                name: {
                    textStyle: { // 修改雷达图文字的样色
                        color: '#4c9bfd'
                    }
                },
                // 修改分割的圆圈的样式
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'

                    }
                },
                splitArea: {
                    show: false
                },
                // 修改坐标轴的线的样式
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },
            series: [{
                    name: '北京',
                    type: 'radar',
                    lineStyle: { // 修改数据区域线条的样式
                        normal: {
                            color: "#FFF",
                            width: 1,
                            opacity: 0.5
                        }
                    },
                    data: [
                        [90, 19, 56, 11, 34]
                    ],
                    // 设置图形标记（拐点）的类型
                    symbol: 'circle',
                    // 设置图形标记（拐点）的大小
                    symbolSize: 3,
                    // 设置图形标记（拐点）的颜色
                    itemStyle: {
                        color: '#fff'
                    },
                    // 让小圆点显示数据
                    label: {
                        show: true,
                        fontSize: 8
                    },
                    // 修改我们数据区域内填充的背景颜色
                    areaStyle: {
                        // opacity: 0.1
                        color: 'rgba(238, 197, 102, 0.6)'
                    }
                },

            ]
        };
        // 3.把配置和数据给对象
        myChart.setOption(option);
        // 4.当浏览器窗口大小变化时，图表大小也同步进行变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();

    //季度销售模块（饼形图）
    (function () {
        // 1.实例化对象
        var myChart = echarts.init(document.querySelector(".gauge"));
        // 2.指定配置和数据
        var option = {
            series: [{
                name: '销售进度模块',
                type: 'pie',
                radius: ['130%', '150%'],
                // 移动位置
                center: ['48%', '80%'],
                //是否启用防止标签重叠策略
                // avoidLabelOverlap: false,
                labelLine: {
                    show: false
                },
                // 饼形图的起始角度
                startAngle: 180,
                // 鼠标经过不需要放大偏移
                hoverOffset: 0,
                data: [{
                        value: 100,
                        // 颜色渐变#00c9e0->#005fc1
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                0,
                                0,
                                0,
                                1,
                                [{
                                        offset: 0,
                                        color: "#00c9e0"
                                    }, // 0 起始颜色
                                    {
                                        offset: 1,
                                        color: "#005fc1"
                                    } // 1 结束颜色
                                ]
                            )
                        }
                    },
                    {
                        value: 100,
                        itemStyle: {
                            color: '#12274d'
                        }
                    },
                    {
                        value: 200,
                        itemStyle: { // 把这个项目的数据的颜色设置为透明
                            color: 'transparent'
                        }
                    }
                ]
            }]
        };
        // 3.把数据和配置给示例对象
        myChart.setOption(option);
        // 4.当浏览器窗口大小变化时，图表大小也同步进行变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();

    //热销排行榜模块
    (function () {
        var hotData = [{
                city: '北京', // 城市
                sales: '25, 179', // 销售额
                flag: true, //  上升还是下降
                brands: [ //  品牌种类数据
                    {
                        name: '可爱多',
                        num: '9,086',
                        flag: true
                    },
                    {
                        name: '娃哈哈',
                        num: '8,341',
                        flag: true
                    },
                    {
                        name: '喜之郎',
                        num: '7,407',
                        flag: false
                    },
                    {
                        name: '八喜',
                        num: '6,080',
                        flag: false
                    },
                    {
                        name: '小洋人',
                        num: '6,724',
                        flag: false
                    },
                    {
                        name: '好多鱼',
                        num: '2,170',
                        flag: true
                    },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [{
                        name: '可爱多',
                        num: '3,457',
                        flag: false
                    },
                    {
                        name: '娃哈哈',
                        num: '2,124',
                        flag: true
                    },
                    {
                        name: '喜之郎',
                        num: '8,907',
                        flag: false
                    },
                    {
                        name: '八喜',
                        num: '6,080',
                        flag: true
                    },
                    {
                        name: '小洋人',
                        num: '1,724',
                        flag: false
                    },
                    {
                        name: '好多鱼',
                        num: '1,170',
                        flag: false
                    },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [{
                        name: '可爱多',
                        num: '2,345',
                        flag: true
                    },
                    {
                        name: '娃哈哈',
                        num: '7,109',
                        flag: true
                    },
                    {
                        name: '喜之郎',
                        num: '3,701',
                        flag: false
                    },
                    {
                        name: '八喜',
                        num: '6,080',
                        flag: false
                    },
                    {
                        name: '小洋人',
                        num: '2,724',
                        flag: false
                    },
                    {
                        name: '好多鱼',
                        num: '2,998',
                        flag: true
                    },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [{
                        name: '可爱多',
                        num: '2,156',
                        flag: false
                    },
                    {
                        name: '娃哈哈',
                        num: '2,456',
                        flag: true
                    },
                    {
                        name: '喜之郎',
                        num: '9,737',
                        flag: true
                    },
                    {
                        name: '八喜',
                        num: '2,080',
                        flag: true
                    },
                    {
                        name: '小洋人',
                        num: '8,724',
                        flag: true
                    },
                    {
                        name: '好多鱼',
                        num: '1,770',
                        flag: false
                    },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [{
                        name: '可爱多',
                        num: '9,567',
                        flag: true
                    },
                    {
                        name: '娃哈哈',
                        num: '2,345',
                        flag: false
                    },
                    {
                        name: '喜之郎',
                        num: '9,037',
                        flag: false
                    },
                    {
                        name: '八喜',
                        num: '1,080',
                        flag: true
                    },
                    {
                        name: '小洋人',
                        num: '4,724',
                        flag: false
                    },
                    {
                        name: '好多鱼',
                        num: '9,999',
                        flag: true
                    },
                ]
            }
        ];

        // 2.根据数据渲染各省热销 sup 模块内容
        // (1) 遍历 hotData 对象
        var supHtml = "";
        $.each(hotData, function (index, item) {
            // console.log(item);
            // console.log(index);
            supHtml += `<li><span>${item.city}</span><span>${item.sales}
             <s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
        });
        // 把拼接好的 6 个 li 字符串给sub dom 盒子
        $(".sup").html(supHtml);
        // 3.鼠标经过tab栏的时候
        // (1) 当前的li高亮显示
        $(".province .sup").on("mouseenter", "li", function () {
            index = $(this).index();
            render($(this));
        });
        // 封装一个渲染函数 
        function render(that) {
            that.addClass("active").siblings("li").removeClass("active");

            // 鼠标经过的时候拿到当前的索引号
            // console.log($(this).index());
            //得到hotData数组中对应索引号的城市对象
            // console.log(hotData[$(this).index()]);
            //得到hotData数组中对应索引号的城市对象 的 品牌对象
            // console.log(hotData[$(this).index()].brands);
            //开始遍历品牌数组
            var subHtml = "";
            $.each(hotData[that.index()].brands, function (index, item) {
                // item 是对应城市的每一个品牌对象
                // console.log(item);
                // 用ES6 模板字符 拼接字符串
                subHtml += `<li><span>${item.name}</span>${item.num}<span> <s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
                // 把拼接好的 6 个 li 字符串给sub dom 盒子
            });
            $(".province .sub").html(subHtml);
        };
        // 4.默认的把第一个 li 处于鼠标经过的状态
        var lis = $(".province .sup li");
        lis.eq(0).mouseenter();
        // 5.开启定时器
        var index = 0;
        var timer = setInterval(function () {
            index++;
            if (index >= 5) index = 0;
            render(lis.eq(index));
        }, 2000);
        // 当鼠标经过的时时候 停止定时器
        $(".province .sup").hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index >= 5) index = 0;
                render(lis.eq(index));
            }, 2000);
        })
    })();
})