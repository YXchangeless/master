<template>
    <Map></Map>
</template>
<script>
import Map from '../../components/echarts/map.vue'
    export default {
        components: { Map },
        data() {
            return {
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
        methods: {
        }

    }
</script>
<style scoped>

</style>