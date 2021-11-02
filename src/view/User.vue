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
            <el-input v-model="input" placeholder="请输入内容" @change="a"></el-input>
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
        </el-card>
        <el-button @click="addId(treeData)">addId</el-button>
        <el-button @click="ss($event)">点击事件</el-button>

        </div>
</template>
<script>
    import Children from '../components/children.vue'
    export default {
        components: {
            Children
        },
        data() {
            return {
                show: ['123'],
                primary: false,
                input: '',
                value: false,
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                arr1: [],
            }
        },
        created() {
        },
        methods: {
            ss(e){
                console.log(e)
                console.log(e.event_prop)
            },
            a(val) {
                console.log(val)
            },
            // TODO
            test() {
                this.$axios
                    .get('https://api.apiopen.top/getJoke?page=1&count=2&type=video')
                    .then(response => (console.log(response)))
                    .catch(function (error) {
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
            // TODO
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