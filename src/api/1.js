// 创建一个空的对象 user。
// 为这个对象增加一个属性，键是 name，值是 John。
// 再增加一个属性，键是 surname，值是 Smith。
// 把键为 name 的属性的值改成 Pete。
// 删除这个对象中键为 name 的属性。
// let user = {
//   name: 'John',
// }
// user['surname'] = 'Smith'
// user.name = 'Pete'
// delete user['name']
// console.log(user)


// let schedule = {};

// function isEmpty() {
//   for(a in schedule) {
//     return false
//   }
//   return true
// }

// console.log( isEmpty(schedule) ); // true

// schedule["8:30"] = "get up";

// console.log( isEmpty(schedule) ); // false

// let salaries = {
//   John: 100,
//   Ann: 160,
//   Pete: 130
// }
// let sum = 0;
// for(key in salaries) {
//   sum += salaries[key]
// }
// console.log(sum)

// 在调用之前
// let obj = {
//   width: 200,
//   height: 300,
//   title: "My menu",
// };
// function multiplyNumeric(obj) {
//   for (let key in obj) {
//     if (typeof obj[key] == 'number') {
//       obj[key] *= 2;
//     }
//   }
// }
// multiplyNumeric(obj);
// console.log(obj)

// function makeUser() {
//   return {
//     name: "John",
//     ref(){
//       return this
//     } 
//   };
// }

// let user = makeUser();

// console.log( user.ref().name );



// function makeUser() {
//   return {
//     name: "John",
//     ref: this
//   };
// }

// let user = makeUser();

// console.log( user.ref );



let user = {
  name: "John",
  age: 30
};

let clone = {}; // 新的空对象

// 将 user 中所有的属性拷贝到其中
for (let key in user) {
  clone[key] = user[key];
}

// 现在 clone 是带有相同内容的完全独立的对象
clone.name = "Pete"; // 改变了其中的数据

console.log( clone ); // 原来的对象中的 name 属性依然是 John