import axios from 'axios'
import config from '../config/config'
import { MessageBox, Message } from 'element-ui'

// http://localhost:8080
const service = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://www.fastmock.site/mock/69fdb9c588cfb3e4f3d5a12804458003/manage',
    // baseURL: config.APi,
    // http://jsonplaceholder.typicode.com/api
    // baseURL: 'http://jsonplaceholder.typicode.com',
    timeout: 10000
})

// 请求之前
service.interceptors.request.use(res=> {
    return res;
},function(error) {
    return Promise.reject(error)
})

// 请求之后
service.interceptors.response.use(res=> {
    const { code, data, msg, status } = res.data
    console.log(res.status)
    if(res.status == 200) {
        Message({
            message: data.msg,
            type: 'success',
        })
        return data
    } else {
        Message({
            message: 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        // return Promise.reject()
    }
    console.log(res)
})

export default service