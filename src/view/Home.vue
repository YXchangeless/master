<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img
          src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          class="img"
        />
        <span>后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-submenu index="2">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="3">用户列表</el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="5">用户列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Input from '../components/input.vue'
// import Add from '../components/add.vue'
// import Add from '@/components/add.vue'
import Sub from '../components/sub.vue'
import Table from '../components/table.vue'
export default {
  name: 'demo',
  components: {
    Input,
    // Add,
    Sub,
    Table,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>