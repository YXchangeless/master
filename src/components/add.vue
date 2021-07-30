<template>
    <div>
        <h3>当前最新的值为：{{this.$store.state.count}}</h3>
        <button @click="addOne()">+1</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            addOne(){
                this.$store.commit('add')
            }
        },
    }
</script>
<style>

</style>