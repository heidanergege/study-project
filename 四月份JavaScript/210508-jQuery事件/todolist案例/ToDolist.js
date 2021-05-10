$(function () {
    // 1.当用户按下enter键时把用户输入的内容存储到本地存储中
    load();
    $("#title").on("keydown", function (event) {

            if (event.keyCode === 13) {
                if ($(this).val() ==="") {
                    $(this).attr("required","");
                    
                } else {
                    var local = getDate(); //把得到的本地存储里的数据拿过来
                    //把local数组更新数据也就是把新的数据以对象的形式追加给local数组
                   local.push({ title: $(this).val(), done: false });
                   //把新的数组保存到本地存储中 
                   saveDate(local);
                   // 本地存储数据渲染加载到页面
                   load();
                   //渲染之后清空用户刚才输入的内容
                    $(this).val("");
                    $(this).removeAttr("required");
                    
                }
            }
    });
    // 3.删除本地存储数据的操作
    // 3-1.给动态创建的删除按钮添加点击事件
    $("ol,  ul").on("click","a",function () {
        // 获取本地存储数据
        var data = getDate();
        // console.log(data);
        // 修改数据
        var index = $(this).attr("index");//获取当前点击a 的索引号
        data.splice(index, 1);//删除数组中从当前索引号开始删除一个数据

        // 重新保存到本地存储
        saveDate(data);
        // 重新渲染到页面
        load();
          
    });
    //  4.正在进行和已完成的切换操作
    // 给复选框按钮绑定点击事件
    $("ol,ul").on("click", "input", function () {
    // 获取本地存储数据
        var data = getDate();
    // 修改数据
        var i = $(this).siblings("a").attr("index");// 通过兄弟a的自定义属性值得到当前点击的input的索引号
        data[i].done = $(this).prop("checked");
        // console.log(data);
        // 重新保存到本地存储
        saveDate(data);
        //  渲染页面
        load();
    })
    // 封装一个读取本地存储的数据的函数       
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
        // 本地存储里面的数据是字符串格式的，但是我们需要的是对象格式的 需要转换
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // 封装保存本地存储数据函数
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };
    //封装渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getDate();
        var todocount = 0;
        var donecount = 0;
        // console.log(data);
        //遍历之前先清空ol和ul里面的数据
        $("ol,ul").empty();

        // 遍历这个数据
        $.each(data,function (i,ele) {
            if (ele.done) {
                $("ul").prepend(' <li> <input type="checkbox" name="" id="" checked="checked"> <p>' + ele.title + '</p> <a href="javascript:;" index="' + i + '"></a> </li>');
                donecount++;
            } else {
                $("ol").prepend(' <li> <input type="checkbox" name="" id=""> <p>' + ele.title + '</p> <a href="javascript:;" index="' + i + '"></a> </li>');
                todocount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    }

})