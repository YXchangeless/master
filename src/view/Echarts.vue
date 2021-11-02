<template>
    <div class="main">
        <div id="echarts" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
        },
        // 模板已经再内存中编译完成，但是没有把模板渲染到页面中
        beforeMount() {
        },
        // 如果通过某些插件操作操作页面中的DOM节点，最早要再mounted中进行
        // 执行完,vue实例已经初始化完毕,组件脱离创建阶段,进行到运行阶段
        mounted() {
            this.ss()
        },
        methods: {
            ss() {
                var myChart = this.$echarts.init(document.getElementById('echarts'));
                myChart.setOption(this.option);
            }
        }

    }
</script>
<style scoped>

</style>