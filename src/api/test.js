import request from '../utils/request'

export default {
    getNews(data) {
      return request({
          url: '/posts',
          method: 'get',
          data
      })
    },
    getData(data){
      return request({
        url: '/api/home/getData',
        method: 'post',
        data
      })
    },
    getLogin(data) {
      return request({
        url: '/api/login',
        method: 'post',
        data
      })
    },
}