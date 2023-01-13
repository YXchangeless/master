// 数据类型     基本类型（string，number，Boolean，null,undefined）  和引用类型（数组Array，对象object，方法function）
// 判断数据类型的方法（1.typeof    2.instanceof    3.Object.prototype.toString.call  4.constructor）
const str = '1'
const num = 1
const bool = false
const n = null
const un = undefined
// const obj = {}
const arr = []
const fun = function(){}
// 1. typeof判断数组和对象都为object
// console.log(typeof(str))
// console.log(typeof(num))
// console.log(typeof(bool))
// console.log(typeof(n))
// console.log(typeof(un))
// console.log(typeof(obj))
// console.log(typeof(arr))
// console.log(typeof(fun))

// 2. instanceof
// console.log(obj instanceof Object)
// console.log(arr instanceof Array)
// console.log(fun instanceof Function)

// 3.Object.prototype.toString.call 
// console.log(Object.prototype.toString.call(obj))
// console.log(Object.prototype.toString.call(arr))
// console.log(Object.prototype.toString.call(fun))

// 4.constructor
// console.log(str.constructor == String)

// const a = 1
// a = 2

// const b  = [1]
// b[0] = 2
// console.log(a)

// let arr1 = [1,2,3]
// let arr2= arr1.slice(0)
// console.log(arr2)
var obj = [[],[],[],[1]]
var s1 = []
for (let i=0;i<obj.length;i++){
    s1.push(obj[i])
}
console.log(s1)



