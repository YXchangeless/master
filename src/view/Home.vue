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
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="2">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>VUE资料库</span>
            </template>
            <el-menu-item index="/lifeCycle">Vue 生命周期</el-menu-item>
            <el-menu-item index="/User">Vue实例</el-menu-item>
            <el-menu-item index="/Echarts">Echarts</el-menu-item>
             <el-menu-item index="/VueX">VUEX</el-menu-item>
             <el-menu-item index="/Index">baby</el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/login">用户列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
let aa
export default {
  name: 'demo',
  components: {},
  data() {
    return {
      collapse: Boolean,
    }
  },
  created() {
    this.collapse = this.$store.state.collapse
  },
  mounted() {},
  methods: {
    toggleCollapse() {
      console.log(this.collapse)
      this.collapse = !this.collapse
      this.$store.commit('changeValue',this.collapse)
    },
    exit() {
      this.$router.push({ path:'/login'})
    },
  },
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
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>