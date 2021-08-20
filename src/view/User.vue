<template>
    <div>
        <el-card class="box-card">
            <Children :primary="primary">
                <template slot="header">
                    <p>内容一：头部内容</p>
                </template>
                <template slot="main">
                    <p>内容二：主体内容</p>
                </template>
                <template slot="footer">
                    <p>内容三：主体内容</p>
                </template>
            </Children>
            <el-button @click="Pro">Promise</el-button>
            <el-button @click="Awit">Awit</el-button>
            <el-button @click.once="test">接口测试</el-button>
        </el-card>

    </div>
</template>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script>
    import axios from 'axios';
    import Children from '../components/children.vue'
    export default {
        components: {
            Children
        },
        data() {
            return {
                primary: false,
            }
        },
        created() {
        },
        methods: {
            test() {
                axios
                    .get('https://api.apiopen.top/getJoke?page=1&count=2&type=video')
                    .then(response => (console.log(response)))
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            },
            Pro() {
                console.log(1)
                let myPromise = new Promise(function (resolve, reject) {
                    setTimeout(() => {
                        console.log(2)
                        console.log(3)
                        console.log(4)
                        resolve()
                    }, 2000)
                })
                myPromise.then((data) => {
                    console.log(5)
                })

            },
            async Awit() {
                console.log(1)
                await new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(2)
                        resolve(1);
                    }, 2000);
                });
                console.log(3)
            },
        }

    }
</script>
<style>

</style>