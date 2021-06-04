$(function () {
    //给时间补零的函数
    function padZero(n) {
        if (n < 10) {
            return n = '0' + n;
        } else {
            return n;
        }
    }

    //定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var sj = new Date(dtStr);

        var y = sj.getFullYear();
        var m = padZero(sj.getMonth());
        var d = padZero(sj.getDate());

        var hh = padZero(sj.getHours());
        var mm = padZero(sj.getMinutes());
        var ss = padZero(sj.getSeconds());

        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss;
    }
    //获取新闻列表的数据
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                return alert('获取新闻列表数据失败！')
            }
            //通过for循环把每一项的tags属性，从以逗号分隔的字符串转换为字符串的数组
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split(',');
            }
            console.log(res);
            var htmlStr = template('tpl-news', res)
            $('#news-list').html(htmlStr);
        })
    };
    getNewsList();
})