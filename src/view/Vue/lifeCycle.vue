<template>
    <div>
        <el-card class="box-card">
            <div>Vue生命周期</div>
            <el-row>
                <el-col :span="12">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="钩子函数" align="center">
                            <template slot-scope="scope">
                                <div>是：{{scope.row.a}}</div>
                                <div>说：{{scope.row.b}}</div> 
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="解释说明" align="center">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12">
                    <img src="../../assets/img/lifecycle.png" style="width: 100%;height: 100%;border: 1px solid #ddd;">
                </el-col>
            </el-row>
        </el-card>
        <!-- <div>
            beforeCreate:
            <span>data和methods中的数据都还没有初始化</span>
        </div>
        <div>
            created:
            <span>如果要调用methods中的方法或者操作data中的数据，最早只能再created中操作</span>
        </div>
        <div>
            beforeMount:
            <span>模板已经再内存中编译完成，但是没有把模板渲染到页面中,此时页面中数据还是之前的</span>
        </div>
        <div>
            mounted:
            <span>内存中的模板已经真实的挂载到页面中</span>
        </div>
        <div>
            父子组件生命周期执行顺序
            <div>父:created 子:created </div>
            <div>子:mounted 父:mounted </div>
            <div>父:beforeUpdate 子:beforeUpdate </div>
            <div>子:updated 父:updated </div>
        </div> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'OK',
                num: 0,
                tableData: [{
                    date: 'beforeCreate',
                    name: 'data和methods中的数据都还没有初始化',
                    address: '上海市普陀区金沙江路 1518 弄',
                    a: 'a',
                    b: 'b',
                }, {
                    date: 'created',
                    name: '如果要调用methods中的方法或者操作data中的数据，最早只能再created中操作',
                    address: '上海市普陀区金沙江路 1517 弄',
                    a: 'a',
                    b: 'b',
                }, {
                    date: 'beforeMount',
                    name: '模板已经再内存中编译完成，但是没有把模板渲染到页面中,此时页面中数据还是之前的',
                    address: '上海市普陀区金沙江路 1519 弄',
                    a: 'a',
                    b: 'b',
                }, {
                    date: 'beforeMount',
                    name: '内存中的模板已经真实的挂载到页面中',
                    a: 'a',
                    b: 'b',
                }]
            }
        },
        activated(){
            
        },
        // 实例完全被创建出来之前
        beforeCreate() {
        },
        created() {
        },
        // 模板已经再内存中编译完成，但是没有把模板渲染到页面中
        beforeMount() {
        },
        // 如果通过某些插件操作操作页面中的DOM节点，最早要再mounted中进行
        // 执行完,vue实例已经初始化完毕,组件脱离创建阶段,进行到运行阶段
        mounted() {

        },
        // 界面没有更新,数据被更新
        beforeUpdate() {
            // 当执行时,页面中的显示数据,还是旧的,此时data数据时最新的,页面没有个最新的数据保持同步
        },
        updated() {
            // 页面和data数据一致
        },
        beforeDestroy() {
            // vue实例进入销毁阶段
            // 身上多有的data和methods,过滤器,指令都处于可用状态
        },
        destroyed() {
            // 身上多有的data和methods,过滤器,指令都处于不可用状态
        },
        methods: {
            add() {
                // this.$router.push({ path:’/user’}) 
                this.num += 1;
                console.log(this.num)
            },
            ss() {
                console.log(1);
                //  setTimeout(this.$router.push({ path:'/login'}),300000)
            }
        }

    }
</script>
<style scoped>

</style>