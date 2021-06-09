// 封装一个把对象转换为键值对格式的查询字符串 的函数
function resolveData(data) {
    var arr = []
    for (var k in data) {
        var str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}
//举例测试
// var res = resolveData({
//     name: 'zs',
//     age: 20
// })
// console.log(res);

function itheima(options) {
    var xhr = new XMLHttpRequest()
    //把外界传递过来的参数对象，转换为 查询字符串
    var qs = resolveData(options.data)

    if (options.method.toUpperCase() === 'GET') {
        //发起 get 请求
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        //发起post 请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)

    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}