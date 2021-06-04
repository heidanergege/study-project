function template(id, data) {
    var str = document.getElementById(id).innerHTML;
    // console.log(str);
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;

    var result = null;
    while (result = pattern.exec(str)) {
        str = str.replace(result[0], data[result[1]]);
    }
    return str;
}