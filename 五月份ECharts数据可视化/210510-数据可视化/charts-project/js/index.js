$(function () {
    (function () {
        // 监控区域效果
        //1. tab 栏切换功能
        //  给tabs 标签栏 绑定 点击事件
        $(".monitor .tabs").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            // 获取当前点击a 的索引号
            // console.log($(this).index());
            // 选取对应索引号的content 内容显示 其余隐藏
            $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
        })
    })();
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

    (function () {
        //2.点位分布统计图模块
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

    // 4.全国用户统计模块柱形图表效果

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

    /* 订单数据模块 */
    (function () {
        var index = 0;
        // 1. 点击实现tab栏切换样式
        // 绑定点击事件
        $(".order .filter").on("click", "a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
            index = $(this).index();
            $(".order .data").eq(index).show().siblings(".data").hide();
        });
        // 2. 开启定时器动态切换数据内容
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


    // 销售额统计模块
    (function () {
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
                right: '10%',
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            grid: {
                top: '20%',
                left: 0,
                right: 0,
                bottom: '3%',
                show: true,
                borderColor: '#012f4a',
                containLabel: true
            },

            xAxis: {
                type: 'category',
                boundaryGap: false, // 图线顶到y轴
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                    smooth: true,
                    data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    stack: '总量',
                    smooth: true,

                    data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
                }
            ]
        };
        // 3.把配置项和数据给实例化对象
        myChart.setOption(option);
        // 4.当浏览器窗口大小变化时，图表大小也同步进行变化
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    })();
})