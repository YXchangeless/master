const Mock = require("mockjs");
import mockLogin from './mockLogin'

Mock.mock('http://localhost:8080/api/login',mockLogin.login)

// 定义mock请求拦截
// export default {
//     getList() {
//         return Mock.mock({
//             meta:{
//                 state:200,
//                 msg: '成功',
//             },
//             data:[{
//                 id: 1,
//                 title: 'mock'
//             }],
//         })
//     },
// }
