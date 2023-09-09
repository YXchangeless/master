let userList = [
  { name: 'zhangsan', age: 18 },
  { name: 'lisi', age: 22 },
  { name: 'zhangsan', age: 18 },
  { name: 'lisi', age: 22 },
  { name: 'lilei', age: 23 },
  { name: 'hanmeimei', age: 27 }
]

const arr = userList.filter((item, index) =>
userList.findIndex(i => i.name === item.name) === index);
console.log(arr);
