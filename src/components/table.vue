<template>
    <div>
        <slot name="header"></slot>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="" label="序号" width="180">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,'2')" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

    </div>
</template>
<script>
    export default {
        props: {
            tableData: Array,
            default: () => { }
        },
        data() {
            return {
            }

        },
        methods: {
            handleClick(a,b) {
                // this.$emit('ss',a,b);
                this.$parent.getVal(a,b);
            },
        }
    }
</script>
<style>

</style>