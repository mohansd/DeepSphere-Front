<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <h3 class="title">Deep Sphere</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleGuest">
          访客登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import { isvalidUsername } from '@/utils/validate'
  // import { login, permissiontest } from '@/api/login'
  export default {
    name: 'login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('请输入正确的用户名'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validatePass = (rule, value, callback) => {
      //   if (value.length < 5) {
      //     callback(new Error('密码不能小于5位'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        loginForm: {
          username: 'test',
          password: 'gushenxing123'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
          password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleGuest() {
        this.$store.dispatch('GuestLogin').then(() => {
          console.log('guest')
          this.loading = false
          this.$router.push({ path: '/overview/overview' })
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  /* reset element-ui css */
  .login-container
    .el-input
      display: inline-block
      height: 47px
      width: 85%
      input
        background: transparent
        border: 0px
        -webkit-appearance: none
        border-radius: 0px
        padding: 12px 5px 12px 15px
        color: $light_gray
        height: 47px
        &:-webkit-autofill
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important
          -webkit-text-fill-color: #fff !important
    .el-form-item
      border: 1px solid rgba(255, 255, 255, 0.1)
      background: rgba(0, 0, 0, 0.1)
      border-radius: 5px
      color: #454545
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .login-container
    position: fixed
    height: 100%
    width: 100%
    background-color: $bg
    .login-form
      position: absolute
      left: 0
      right: 0
      width: 520px
      padding: 35px 35px 15px 35px
      margin: 120px auto

    .tips
      font-size: 14px
      color: #fff
      margin-bottom: 10px
      span
        &:first-of-type
          margin-right: 16px

    .svg-container
      padding: 6px 5px 6px 15px
      color: $dark_gray
      vertical-align: middle
      width: 30px
      display: inline-block
      &_login
        font-size: 20px

    .title
      font-size: 26px
      font-weight: 400
      color: $light_gray
      margin: 0px auto 40px auto
      text-align: center
      font-weight: bold

    .show-pwd
      position: absolute
      right: 10px
      top: 7px
      font-size: 16px
      color: $dark_gray
      cursor: pointer
      user-select: none
</style>
