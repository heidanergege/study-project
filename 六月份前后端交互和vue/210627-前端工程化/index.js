// // 默认导入语法
// import m1 from './m1'
// console.log('ok');
// console.log(m1); //打印的结果为： {a:10, b:20,show:[Function: show]}

// //按需导入语法
// import {
//    a1,
//    b1,
//    say
// } from './m1';
// console.log(a1);
// console.log(b1);
// console.log(say);


//直接导入并执行模块代码，不需要暴露私有成员，直接执行代码  语法如下：
import './m2.js'