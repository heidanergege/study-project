// 定义私有成员
let a = 10
let b = 20
let c = 30
let d = 40

function show(params) {
   console.log('hello');
}

// 将本模块中的私有成员暴露出去，供其他的模块使用
export default {
   a,
   b,
   show
}

// 注意：在一个模块中，只允许使用export default 向外默认暴露一次成员，不能写多个export default
// 如果在一个模块中没有向外暴露成员，其他模块引入该模块时将会的到一个空对象

// 按需导出语法
export let a1 = 'aaa'
export let b1 = 'bbb'
export function say() {
   console.log('hi');
}