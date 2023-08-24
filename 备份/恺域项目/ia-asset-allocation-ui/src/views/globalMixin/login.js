import { validUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    // 校验用户名
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户不存在'))
      } else {
        callback()
      }
    }
    // 校验密码
    // const validatePassword = (rule, value, callback) => {
    //   if (/[\u4E00-\u9FA5]/g.test(value)) {
    //     this.$refs.passwordItem ? this.$refs.passwordItem.$el.style.border = '1px solid #fd5757' : ''
    //     callback(new Error('密码不能输入中文'))
    //   } else if (value.length < 6) {
    //     this.$refs.passwordItem ? this.$refs.passwordItem.$el.style.border = '1px solid #fd5757' : ''
    //     callback(new Error('密码位数不能少于6位'))
    //   } else {
    //     this.$refs.passwordItem ? this.$refs.passwordItem.$el.style.border = '1px solid #dbdcdc' : ''
    //     callback()
    //   }
    // }
    const validateOldPassword = (rule, value, callback) => {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        this.$refs.oldPassword ? this.$refs.oldPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码不能输入中文'))
      } else if (value.length < 6) {
        // this.$refs.oldPassword ? this.$refs.oldPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码位数不能少于6位'))
      } else {
        // this.$refs.oldPassword ? this.$refs.oldPassword.$el.style.border = '1px solid #dbdcdc' : ''
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        this.$refs.newPassword ? this.$refs.newPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码不能输入中文'))
      } else if (value.length < 6) {
        // this.$refs.newPassword ? this.$refs.newPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码位数不能少于6位'))
      } else {
        // this.$refs.newPassword ? this.$refs.newPassword.$el.style.border = '1px solid #dbdcdc' : ''
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        this.$refs.confirmPassword ? this.$refs.confirmPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码不能输入中文'))
      } else if (value.length < 6) {
        // this.$refs.confirmPassword ? this.$refs.confirmPassword.$el.style.border = '1px solid #fd5757' : ''
        callback(new Error('密码位数不能少于6位'))
      } else {
        // this.$refs.confirmPassword ? this.$refs.confirmPassword.$el.style.border = '1px solid #dbdcdc' : ''
        callback()
      }
    }
    return {
      // 用户信息
      loginForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 校验规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
        newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      // 密码类型
      passwordType: 'password',
      newPasswordType: 'password',
      confirmPasswordType: 'password',
      // 加载状态
      loading: false
    }
  },
  methods: {
    // 切换显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        // this.$refs.oldPassword.focus()
      })
    },
    showNewPassword() {
      if (this.newPasswordType === 'password') {
        this.newPasswordType = ''
      } else {
        this.newPasswordType = 'password'
      }
      this.$nextTick(() => {
        // this.$refs.newPassword.focus()
      })
    },
    showConfirmPassword() {
      if (this.confirmPasswordType === 'password') {
        this.confirmPasswordType = ''
      } else {
        this.confirmPasswordType = 'password'
      }
      this.$nextTick(() => {
        // this.$refs.newPassword.focus()
      })
    }
  }
}
