<template>
    <div class="content">
        <Add></Add>
        <Sub></Sub>
        <div class="d1">
            <div class="d2"></div>
            <div class="d3"></div>
        </div>
    </div>
</template>
<script>
    import Add from '../components/add.vue'
    import Sub from '../components/sub.vue'
    export default {
        components: {
            Add,
            Sub
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
        }

    }
</script>
<style>
.d1 {
    width: 100%;
    height: 200px;
    border: 1px solid #000;
    display: flex;
}
.d2 {
    width: 100%;
}
.d3 {
    width: 500px;
    border: 1px solid #f00;
}
</style>