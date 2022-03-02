<template>
    <div class="main">
        <div style="width: 50%;">
            <div id="echarts" style="width: 100%;height:400px;border: 1px solid #ddd;"></div>
        </div>
        <el-button @click="a">123</el-button>
        <div class="f">
            <div class="h">112</div>
        </div>
    </div>
</template>
<script>
    import { sum } from './sum.js'
    export default {
        data() {
            return {
                collapse: Boolean,
                option: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                },
            }
        },
        // 实例完全被创建出来之前
        beforeCreate() {
        },
        created() {
            this.ss()
            this.collapse = this.$store.state.collapse
            console.log(this.collapse + 'uuuuuuuuuuuuuu')
        },
        // 模板已经再内存中编译完成，但是没有把模板渲染到页面中
        beforeMount() {
        },
        // 如果通过某些插件操作操作页面中的DOM节点，最早要再mounted中进行
        // 执行完,vue实例已经初始化完毕,组件脱离创建阶段,进行到运行阶段
        mounted() {
            this.ss()
        },
        watch: {
            "$store.state.collapse"() {
                setTimeout(() => {
                    var myChart = this.$echarts.init(document.getElementById('echarts'));
                    myChart.resize()
                }, 300)
            }
        },
        methods: {
            ss() {
                var myChart = this.$echarts.init(document.getElementById('echarts'));
                myChart.setOption(this.option);
                setTimeout(function () {
                    window.onresize = function () {
                        myChart.resize();
                    }
                }, 200)
            },
            a() {
                this.$confirm('是否要删除', '提示', { closeOnClickModal: false }).then(() => {
                    this.$message.success('删除成功')
                })

            },
        }

    }
</script>
<style scoped>
.f {
    width: 100px;
    height: 50px;
    border: 1px solid #000;
}
</style>