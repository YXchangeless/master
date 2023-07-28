<template>
  <div class="login_body">
    <div class="login_box">
      <div class="avater_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginRef" :model="loginFrom" label-width="0px" class="login_from" :rules="loginRules">
        <!-- 用户名 -->
        <el-form-item prop="userName">
        <el-input prefix-icon="el-icon-user" v-model="loginFrom.userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPwd">
        <el-input prefix-icon="el-icon-goods" v-model="loginFrom.userPwd" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
           <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      loginFrom: {
          userName: 'admin',
          userPwd:'admin',
        },
        loginRules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          token:'111',
        }
    }
  },
  methods: {
      reset() {
        this.$refs.loginRef.resetFields();
      },
      login(){
        this.$refs.loginRef.validate(async valid=>{
          if(!valid) return this.$message.error("登录失败");
          else{
            // 
            const token = Mock.Random.guid()
            Cookie.set('token',token)
            // 存储token开始时间
            this.$api.test.getLogin(this.loginFrom).then(res=> {
              console.log(res)
              if(res.code == 200) {
                window.localStorage.setItem('tokenStartTime',new Date().getTime())
                this.$router.push("/home");
              } else {
                this.$message.error(res.msg || '登陆失败！');
              }
            })
          }
          console.log(valid);
        })
      }
    }
};
</script>
<style slot-scope>
.login_body {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avater_box {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 2%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_from{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>