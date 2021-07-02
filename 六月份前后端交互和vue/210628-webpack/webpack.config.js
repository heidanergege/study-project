const path = require('path') //导入node.js中专门操作路径的模块

module.exports = {
   //mode 用来指定构建模式
   mode: 'development', //开发模式 
   entry: path.join(__dirname, './src/index.js'), //打包入口文件的路径
   output: {
      path: path.join(__dirname, './dist'), //输出文件的存放路径
      filename: 'bundle.js' //输出的文件名称
   }
}