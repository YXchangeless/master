<template>
    <div>
        <el-card class="box-card">
            <el-input v-model="input" :placeholder="placeholder" class="input"></el-input>
              <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
        </el-card>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                input: '',
                placeholder: '请输入内容',
            }
        },
        created() {
            if (this.input == '') {
                this.placeholder = ''
            }
        },
        methods: {

        }

    }
</script>
<style>

</style>