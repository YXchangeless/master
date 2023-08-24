<template>
  <div class="assets-scroll newsearchTitle">
    <div class="title-bar">
      <span /> {{ !!compIndexId ? '修改复合指数' : '新增复合指数' }}
    </div>
    <!-- 新增 -->
    <div>
      <el-form ref="compIndexInfo" class="conditionFilter" :model="compIndexInfo" :rules="rules">
        <!-- 复合指数名称 -->
        <el-row>
          <el-col>
            <el-form-item label="复合指数名称 ：" prop="compIndexNm" label-width="127px">
              <el-input v-model="compIndexInfo.compIndexNm" class="compositeIndex" placeholder="请输入" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- end 复合指数名称 -->
        <!-- 采样基准 -->
        <div class="sampling">
          <el-row v-for="(bench, idx) in compIndexInfo.benchList" :key="bench.key">
            <el-col>
              <el-form-item v-if="idx === 0" label="采样基准 ： " style="margin-left:10px;">
              </el-form-item>
            </el-col>
            <!-- 基准名称 -->
            <el-col :span="8" style="margin-left:28px">
              <el-form-item
                label="基准名称 ： "
                :class="['spanFont', idx !== 0 ? ' left157' : '']"
                :prop="'benchList.' + idx + '.indexCd'"
                :rules="moreNotifyOjbectRules.moreNotifyOjbectName"
                label-width="127px"
              >
                <el-select v-model="bench.indexCd" filterable placeholder="请选择" @change="getBenchmarkName">
                  <el-option
                    v-for="item in indexNmList"
                    :key="item.indexCd"
                    :label="item.indexNm"
                    :value="item.indexCd"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- end 基准名称 -->
            <!-- 权重 -->
            <el-col :span="12">
              <el-form-item label="权重 ： " :prop="'benchList.' + idx + '.weight'" :rules="weightRules.weightName" label-width="127px">
                <kyInputNumber
                  v-model="bench.weight"
                  :max="99.99"
                  :min="0.01"
                ></kyInputNumber>
                <span style="color:#000;margin-left:8px;">%</span>
                <el-button class="delButton" @click="delBench(idx)">删除</el-button>
                <el-button v-if="idx === compIndexInfo.benchList.length - 1" class="addButton" @click="addBench">新增</el-button>
              </el-form-item>
            </el-col>
            <!-- end 权重 -->
          </el-row>
        </div>
        <!-- end 采样基准 -->
        <!-- 保存 重置按钮 -->
        <el-row style="margin-top:10px">
          <el-col :span="24" class="buttonSet">
            <el-button @click="goCompoundList('compIndexInfo')">取消</el-button>
            <el-button type="primary" @click="saveCompIndexInfo('compIndexInfo')" style="margin-left: 20px;">保存</el-button>
          </el-col>
        </el-row>
        <!-- end 保存 重置按钮 -->
      </el-form>
    </div>
    <!-- end新增 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'

export default {
  name: 'NewCompoundList',
  data() {
    return {
      disabled: false,
      // 权重校验规则
      weightRules: {
        weightName: [{ required: true, message: '请输入权重', trigger: 'blur' }]
      },
      // 基准名称校验规则
      moreNotifyOjbectRules: {
        moreNotifyOjbectName: [{ required: true, message: '请选择基准名称', trigger: 'change' }]
      },
      // 复合指数名称校验规则
      rules: {
        compIndexNm: [
          { required: true, message: '请输入复合指数名称', trigger: 'blur' }
        ]
      },
      // 复合指数编号
      compIndexId: '',
      // 复合指数名称
      compIndexInfo: {
        // 复合指数名称
        compIndexNm: '',
        // 采样基准列表，默认2个，权重默认空
        benchList: [
          {
            key: uuid(),
            // 指数代码
            indexCd: '',
            // 指数名称
            indexNm: '',
            // 权重
            weight: undefined
          }, {
            key: uuid(),
            // 指数代码
            indexCd: '',
            // 指数名称
            indexNm: '',
            // 权重
            weight: undefined
          }
        ]
      },
      // 基准名称数组
      indexNmList: [],
      // 复合指数名称
      compIndexNm: ''
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    // 复合指数编号获取列表
    const compIndexId = this.$route.query.id
    if (compIndexId) {
      this.compIndexId = compIndexId
      this.loadData(compIndexId)
    }
    // 加载指数名称列表数据，用于下拉
    this.loadIndexNmList()
  },
  methods: {
    // 返回key
    getUUID() {
      return uuid()
    },
    getBenchmarkName(val) {
      this.indexNmList.forEach((item2) => {
        item2.disabled = false
        this.compIndexInfo.benchList.forEach((item1) => {
          if (item1.indexCd === item2.indexCd) {
            item2.disabled = true
          }
        })
      })
    },
    // 加载指数详情数据 @param compIndexId 复合指数编号
    loadData(compIndexId) {
      this.$api.list.pageList(compIndexId).then((res) => {
        if (res.data && res.data.compIndexNm) {
          this.compIndexInfo.compIndexNm = res.data.compIndexNm || ''
          const benchList = res.data.benchList || []
          benchList.forEach((element) => {
            element.key = this.getUUID()
          })
          this.compIndexInfo.benchList = benchList
        }
      })
    },
    // 取消
    goCompoundList(formName) {
      this.indexNmList.forEach((item2) => {
        item2.disabled = false
        this.compIndexInfo.benchList.forEach((item1) => {
          if (item1.indexCd === item2.indexCd) {
            item2.disabled = false
          }
        })
      })
      const compIndexId = this.$route.query.id
      if (compIndexId) {
        this.compIndexId = compIndexId
        this.loadData(compIndexId)
      }
      this.$refs[formName].resetFields()
      this.loadIndexNmList()
      // this.compIndexInfo = {
      //   compIndexNm: '',
      //   benchList: [
      //     {
      //       key: uuid(),
      //       indexCd: '',
      //       indexNm: '',
      //       weight: undefined
      //     }, {
      //       key: uuid(),
      //       indexCd: '',
      //       indexNm: '',
      //       weight: undefined
      //     }
      //   ]
      // }
    },
    // 加载指数名称列表数据，用于下拉
    loadIndexNmList() {
      this.$api.list.indexNmList().then((res) => {
        this.indexNmList = res.data || []
        this.indexNmList.forEach((item2) => {
          item2.disabled = false
          this.compIndexInfo.benchList.forEach((item1) => {
            if (item1.indexCd === item2.indexCd) {
              item2.disabled = true
            }
          })
        })
      })
    },
    // 新增基准
    addBench() {
      const length = this.compIndexInfo.benchList.length
      // todo 确认限制个数
      if (length >= 10) {
        this.$message.warning('基准个数不能超过10个')
        // todo 是否要删掉超出10个部门
      } else {
        // todo 计算剩余采样基准值
        this.compIndexInfo.benchList.push({
          key: this.getUUID(),
          // 指数代码
          indexCd: '',
          // 指数名称
          indexNm: '',
          // 权重
          weight: undefined
        })
      }
    },
    // 删除基准 @param idx 索引
    delBench(idx) {
      this.$confirm('是否要删除当前采样基准', '提示').then(() => {
        if (this.compIndexInfo.benchList.length <= 2) {
          this.$message.warning('至少有两个采样基准')
        } else {
          this.compIndexInfo.benchList.splice(idx, 1)
          this.indexNmList.forEach((item2) => {
            item2.disabled = false
            this.compIndexInfo.benchList.forEach((item1) => {
              if (item1.indexCd === item2.indexCd) {
                item2.disabled = true
              }
            })
          })
        }
      })
    },
    // 保存复合指数信息
    saveCompIndexInfo(formName) {
      this.$refs.compIndexInfo.validate((valid) => {
        if (valid) {
          const compIndexInfo = {
            compIndexId: this.compIndexId,
            compIndexNm: this.compIndexInfo.compIndexNm,
            benchList: this.compIndexInfo.benchList.map(bench => ({
              indexCd: bench.indexCd,
              indexNm: bench.indexNm,
              weight: bench.weight
            }))
          }
          this.$api.list.saveCompIndexInfo(compIndexInfo).then((res) => {
            this.$router.push({ path: 'compoundList' })
            this.$message.success('保存成功')
            this.goCompoundList()
            this.$router.push({ name: 'compoundList' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../newList/index.css";

.operate span {
  display: block;
  float: left;
  line-height: 32px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #4b556a;
}

.span220 >>> .el-input__inner {
  border: none;
  height: 32px;
  line-height: 32px;
}
</style>
<style lang="scss">
.newsearchTitle {
  .Title {
    float: left;
    color: #000;
    padding: 7px;
  }
  .new {
    margin-top: 0;
  }

  .compositeIndex {
    width: 220px;
  }
  .sampling{
    border:1px solid #eee
  }
  .buttonSet{
    text-align: center;
  }
  .delButton{
    background-color:#fff;
    position: absolute;
    color:red;
    border:none;
    font-size:12px;
    font-family: PingFang SC;
    color:#fd5757;
    margin-left:20px;
    width: 44px;
    height: 37.6px;
  }
  .delButton:hover{
    background-color: #eaf1fa;
  }
  .addButton{
    position: absolute;
    margin-left:74px;
    background-color:#fff;
    color:#2A76CD;
    border:none;
    font-size:12px;
    font-family: PingFang SC;
    color:#2a76cd;
    width: 44px;
    height: 37.6px;
  }
  .addButton:hover{
    background-color: #eaf1fa;
  }
}
</style>
