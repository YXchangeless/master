const Mock = require("mockjs");

// 定义mock请求拦截
export default Mock.mock({
    meta:{
        state:200,
        msg: '成功',
    },
    data:[{
        id: 1,
        title: 'mock'
    }],
})
