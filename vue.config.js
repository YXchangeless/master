module.exports= {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false, //是否开启eslint
    devServer: {
        open:true,
        // host:"localhost",
        port:'8080',
        https:false,
        hotOnly:false,
        proxy: {
            '/api':{
              target:'http://jsonplaceholder.typicode.com/api',           //我的电脑
                changeOrigin:true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}