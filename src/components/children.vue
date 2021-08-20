<template>
    <div>
        内容如下：
        <slot name="header"></slot>
        <slot name="main"></slot>
        <slot name="footer"></slot>
        <div>
            <el-button v-if="primary" type="primary">主要按钮</el-button>
            <el-button v-if="success" type="success">成功按钮</el-button>
            <el-button v-if="info" type="info">信息按钮</el-button>
            <el-button v-if="warning" type="warning">警告按钮</el-button>
            <el-button v-if="danger" type="danger">危险按钮</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            primary: {
                type: Boolean,
                default: true
            },
            success: {
                type: Boolean,
                default: true
            },
            info: {
                type: Boolean,
                default: true
            },
            warning: {
                type: Boolean,
                default: true
            },
            danger: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
            }
        }
    }
</script>
<style>

</style>