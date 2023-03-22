const Mock = require("mockjs");
export default {
    login:data => {
        const { userName, userPwd } = JSON.parse(data.body)
        if(userName == 'admin' && userPwd == 'admin') {
            return {
                data: {
                    code: 200,
                    msg: '登录成功',
                }
            }
        } else {
            return {
                data: {
                    code: 400,
                    msg: '登录失败',
                }
            }
        }
    },
}