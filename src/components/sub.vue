<template>
    <div>
        <h3>当前最新的值为：{{difference}}</h3>
        <button @click="subOne">-1</button>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState(['difference'])
        },
        methods: {
            subOne() {
                this.$store.commit('sub')
            }
        }
    }
</script>
<style>
    
</style>