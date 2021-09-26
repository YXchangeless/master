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
        <el-tree :data="data" show-checkbox node-key="code" :default-expand-all="true" :default-checked-keys="show"
            :props="defaultProps">
        </el-tree>
        <el-button @click="addId(treeData)">addId</el-button>
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
                treeData: [
                    {
                        "code": "0",
                        "title": "0",
                        "parentCode": "-1",
                        "expand": true,
                        "selected": null,
                        "checked": null,
                        "loading": null,
                        "children": [
                            {
                                "code": "1",
                                "title": "县公安局",
                                "parentCode": "0",
                                "expand": false,
                                "selected": null,
                                "checked": null,
                                "loading": null,
                                "children": [
                                    {
                                        "code": "2",
                                        "title": "刑侦大队",
                                        "parentCode": "1",
                                        "expand": false,
                                        "selected": null,
                                        "checked": null,
                                        "loading": null,
                                        "children": [
                                            {
                                                "code": "4",
                                                "title": "司法",
                                                "parentCode": "2",
                                                "expand": false,
                                                "selected": null,
                                                "checked": null,
                                                "loading": null,
                                                "children": [
                                                    {
                                                        "code": "6",
                                                        "title": "王五",
                                                        "parentCode": "4",
                                                        "expand": false,
                                                        "selected": null,
                                                        "checked": null,
                                                        "loading": null,
                                                        "children": null,
                                                        "disabled": null,
                                                        "disableCheckbox": null
                                                    },
                                                    {
                                                        "code": "7",
                                                        "title": "李四",
                                                        "parentCode": "4",
                                                        "expand": false,
                                                        "selected": null,
                                                        "checked": null,
                                                        "loading": null,
                                                        "children": null,
                                                        "disabled": null,
                                                        "disableCheckbox": null
                                                    }
                                                ],
                                                "disabled": null,
                                                "disableCheckbox": null
                                            },
                                            {
                                                "code": "5",
                                                "title": "民政",
                                                "parentCode": "2",
                                                "expand": false,
                                                "selected": null,
                                                "checked": null,
                                                "loading": null,
                                                "children": [
                                                    {
                                                        "code": "4",
                                                        "title": "王亮",
                                                        "parentCode": "5",
                                                        "expand": false,
                                                        "selected": null,
                                                        "checked": null,
                                                        "loading": null,
                                                        "children": null,
                                                        "disabled": null,
                                                        "disableCheckbox": null
                                                    },
                                                    {
                                                        "code": "5",
                                                        "title": "崇仁县",
                                                        "parentCode": "5",
                                                        "expand": false,
                                                        "selected": null,
                                                        "checked": true,
                                                        "loading": null,
                                                        "children": null,
                                                        "disabled": null,
                                                        "disableCheckbox": null
                                                    }
                                                ],
                                                "disabled": null,
                                                "disableCheckbox": null
                                            }
                                        ],
                                        "disabled": null,
                                        "disableCheckbox": null
                                    }
                                ],
                                "disabled": null,
                                "disableCheckbox": null
                            },
                            {
                                "code": "3",
                                "title": "政法",
                                "parentCode": "0",
                                "expand": false,
                                "selected": null,
                                "checked": null,
                                "loading": null,
                                "children": [
                                    {
                                        "code": "123",
                                        "title": "张新",
                                        "parentCode": "3",
                                        "expand": false,
                                        "selected": null,
                                        "checked": null,
                                        "loading": null,
                                        "children": null,
                                        "disabled": null,
                                        "disableCheckbox": null
                                    },
                                    {
                                        "code": "2",
                                        "title": "李新",
                                        "parentCode": "3",
                                        "expand": false,
                                        "selected": null,
                                        "checked": null,
                                        "loading": null,
                                        "children": null,
                                        "disabled": null,
                                        "disableCheckbox": null
                                    },
                                    {
                                        "code": "3",
                                        "title": "张天阳",
                                        "parentCode": "3",
                                        "expand": false,
                                        "selected": null,
                                        "checked": null,
                                        "loading": null,
                                        "children": null,
                                        "disabled": null,
                                        "disableCheckbox": null
                                    }
                                ],
                                "disabled": null,
                                "disableCheckbox": null
                            }
                        ],
                        "disabled": null,
                        "disableCheckbox": null
                    }
                ],
            }
        },
        created() {
        },
        methods: {
            addId(arr) {
                let a = 'array'
                if (typeof arr == 'object' || typeof arr == a) {
                    var result = [];
                    arr.forEach(element => {
                        if (element.children) {
                            if (element.checked) {
                                this.arr1.push(element.code)
                                console.log(element.code)
                                console.log(this.arr1)
                            }
                            this.addId(element.children);
                        }
                        result.push(element.code);
                    });
                    return result;
                }
                return arr;
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