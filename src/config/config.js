// 环境变量配置
const env = 'pro'
const envConfig = {
    // 本地
    development: {
        baseApi: '/api',
        APi: 'http://localhost:8080',
    },
    // 测试
    test: {
        baseApi: '/api',
        APi: 'http://localhost:8080',
    },
    // 线上
    pro: {
        baseApi: '/api',
        APi: 'http://jsonplaceholder.typicode.com',
    }
}

export default {
    env,
    ...envConfig[env]
}