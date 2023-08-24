<template>
  <div class="navbar">
    <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper ">
          <svg-icon icon-class="user" style="font-size: 27px;color:rgb(191, 203, 217)"></svg-icon>
          <span> 欢迎您， {{ name }}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- 主页 -->
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <!-- end主页 -->
          <!-- 修改密码 -->
          <el-dropdown-item divided @click.native="updatePassword">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <!-- end修改密码 -->
          <!-- 退出登录 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
          <!-- end退出登录 -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 返回 -->
    <div class="back">
      <el-button class="el-icon-back" @click.native="back">返回</el-button>
    </div>
    <!-- end返回 -->
    <!-- 修改密码弹窗 -->
    <!-- <el-dialog
      title="修改密码"
      :visible.sync="updatePasswordDialog"
      width="30%"
      class="login-container"
    >
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      > -->
    <!-- end修改密码 -->
    <!-- 用户名 -->
    <!-- <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="username"
        v-model="username"
        name="username"
        tabindex="1"
        disabled
        style="color:#606266 "
        placeholder="Username"
        type="text"
        auto-complete="on"
      />
    </el-form-item> -->
    <!-- end用户名 -->
    <!-- 密码 -->
    <!-- <el-form-item ref="passwordItem" prop="password">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        :key="passwordType"
        ref="password"
        v-model="loginForm.password"
        :type="passwordType"
        placeholder="Password"
        name="password"
        tabindex="2"
        auto-complete="on"
        @keyup.enter.native="saveDialog"
      />
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item> -->
    <!-- end密码 -->
    <!-- </el-form> -->
    <!-- 取消 确定按钮 -->
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="updatePasswordDialog = false">取 消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="saveDialog">确 定</el-button>
    </span> -->
    <!-- 取消 确定按钮 -->
    <!-- </el-dialog> -->
    <!-- end修改密码弹窗 -->
    <!-- 测试 -->
    <el-dialog
        title="修改密码"
        :visible.sync="updatePasswordDialog"
        width="30%"
        class="login-container"
        :close-on-click-modal="false"
    >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item label="原始密码 ：" :label-width="formLabelWidth" prop="oldPassword">
          <el-input
              ref="oldPassword"
              v-model="loginForm.oldPassword"
              :type="passwordType"
              name="oldPassword"
              tabindex="1"
              auto-complete="on"
              show-password
          ></el-input>
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
        <el-form-item label="新密码 ：" :label-width="formLabelWidth" prop="newPassword">
          <el-input
              ref="newPassword"
              v-model="loginForm.newPassword"
              :type="newPasswordType"
              name="newPassword"
              tabindex="2"
              auto-complete="on"
              show-password
          ></el-input>
          <!-- <span class="show-pwd" @click="showNewPassword">
            <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
        <el-form-item label="确认新密码 ：" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input
              ref="confirmPassword"
              v-model="loginForm.confirmPassword"
              :type="confirmPasswordType"
              name="confirmPassword"
              tabindex="3"
              auto-complete="on"
              show-password
          ></el-input>
          <!-- <span class="show-pwd" @click="showConfirmPassword">
            <svg-icon :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- this.$refs.modelPlanRef.reset() -->
        <el-button @click="resetForm('loginForm')">取 消</el-button>
        <el-button style="margin-left:20px" type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import login from '@/views/globalMixin/login.js'

export default {
  components: {
    breadcrumb,
    Hamburger
  },
  mixins: [login],
  data() {
    return {
      updatePasswordDialog: false,
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    ...mapState({
      name: (state) => state.user.name,
      username: (state) => state.user.username
    })
  },
  methods: {
    // 取消
    resetForm(loginForm) {
      this.loginForm.oldPassword = ''
      this.loginForm.newPassword = ''
      this.loginForm.confirmPassword = ''
      this.$refs[loginForm].resetFields()
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 展开菜单
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 修改密码
    updatePassword() {
      this.updatePasswordDialog = true
      this.loginForm.oldPassword = ''
      this.loginForm.newPassword = ''
      this.loginForm.confirmPassword = ''
      // this.loginForm.password = ''
      // this.$nextTick(() => {
      //   this.$refs.passwordItem.$el.style.border = '1px solid #dbdcdc'
      //   this.$refs['loginForm'].resetFields()
      // })
    },
    // 确定
    sure() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const formData = new window.FormData()
          formData.append('oldPassword', this.loginForm.oldPassword)
          formData.append('newPassword', this.loginForm.newPassword)
          formData.append('confirmPassword', this.loginForm.confirmPassword)
          this.$api.user.updatePassword(formData).then((res) => {
            if (res.code === '200') {
              this.updatePasswordDialog = false
              this.$message.success('修改密码成功')
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          const formData = new window.FormData()
          formData.append('oldPassword', this.loginForm.oldPassword)
          formData.append('newPassword', this.loginForm.newPassword)
          formData.append('confirmPassword', this.loginForm.confirmPassword)
          this.$api.user.updatePassword(formData).then((res) => {
          })
          return false
        }
      })
    },
    // 修改密码弹窗
    saveDialog() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$refs.passwordItem.$el.style.border = '1px solid #dbdcdc'
      //     const formData = new window.FormData()
      //     formData.append('password', this.loginForm.password)
      //     this.$api.user.updatePassword(formData).then((res) => {
      //       if (res.code === '200') {
      //         this.updatePasswordDialog = false
      //         this.$message.success('修改密码成功')
      //       } else {
      //         this.$message.warning(res.message)
      //       }
      //     })
      //   } else {
      //     this.$message.warning('密码输入有误')
      //     this.$refs.passwordItem.$el.style.border = '1px solid #fd5757'
      //     return false
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
.navbar {
  .back {
    .el-button {
      span {
        margin-left: 5px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .login-container .el-input input {
    color: #000 !important;
    border: 1px solid #ddd;
    height: 32px;
    border-radius: 4px;
    caret-color: #000
  }

  .login-container .el-form-item {
    background-color: #fff;

    .el-input {
      height: 32px;
      width: 85%;
      color: #000;
    }
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 30px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  margin-top: 50px;
  border-bottom: 1px solid #DBDCDC;

  .back {
    position: absolute;
    right: 20px;
    top: 0px;

    .el-button {
      height: 30px;
      width: 55px;
      line-height: 30px;
      font-size: 12px;
      color: #606266;
      border: none;
    }

    .el-button:focus {
      background-color: #fff;
    }

    .el-button:hover {
      background-color: #eaf1fa;
    }
  }

  .hamburger-container {
    line-height: 28px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    line-height: 50px;
    position: fixed;
    z-index: 9;
    top: 0px;
    right: 23px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        //margin-top: 5px;
        position: relative;
        color: #FFFFFF;

        span, svg, i {
          vertical-align: middle;

          &:hover {
            cursor: pointer;
          }
        }

        i {
          top: 22px !important;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
