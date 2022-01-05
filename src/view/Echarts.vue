<template>
    <div class="main">
        <div style="width: 50%;">
            <div id="echarts" style="width: 100%;height:400px;border: 1px solid #ddd;"></div>
        </div>
        <el-button @click="a">123</el-button>
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
                    this.chart.resize()
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
                var myChart = this.$echarts.init(document.getElementById('echarts'));
                myChart.setOption(this.option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
        }

    }
</script>
<style scoped>

</style>