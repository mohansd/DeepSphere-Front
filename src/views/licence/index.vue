<template>
  <div>
    <div class="logo">
      <img src="@/assets/img/logo1.png" class="img"/>
    </div>
    <p class="back-button" @click="backToLogin">返回登录</p>
    <span>{{time}}</span>
    <div class="form-container" align="center">
      <h1 class="title">输入产品密钥</h1>
      <svg-icon icon-class="licence" class="icon"></svg-icon>
      <el-input placeholder="输入产品密钥" v-model="key" clearable></el-input>
      <el-button @click="handleRegister">确定</el-button>
      <p class="example" @click="showExample">查看产品密钥示例</p>
    </div>
  </div>
</template>

<script>
  import { register } from '../../api/licence/licence'

  export default {
    name: 'index',
    data() {
      return {
        key: '',
        time: ''
      }
    },
    methods: {
      showExample() {
        this.key = 'f50d3d97355e8fce4690f8'
      },
      handleRegister() {
        register(this.key).then(res => {
          console.log(res)
          if (res.data && res.data.includes('Success')) {
            this.$alert('注册成功,点击确定返回登录', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.backToLogin()
              }
            })
          } else {
            this.$confirm('密钥错误或已失效,请重新输入', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$confirm('网络错误,请确认后重试', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          })
        })
      },
      backToLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .logo
    display inline-block
    margin 30px auto auto 58px
    width: 200px
    height: 100px
    .img
      width auto
      height auto
      max-width 100%
      max-height 100%
  .back-button
    display inline-block
    width 100px
    position absolute
    top 20px
    right 20px
    border-bottom 1px solid #5eb3b5
    color #5eb3b5
    font-size 20px
    letter-spacing 5px
    text-align center
    cursor pointer
  .form-container
    width 700px
    margin 50px auto
    .title
      font-size 40px
      letter-spacing 10px
      color: #4d4d4d
      text-align center
    .icon
      margin 60px auto 80px
      width 40%
      height 200px
    .example
      width 200px
      border-bottom 1px solid #5eb3b5
      margin 100px
      color #5eb3b5
      font-size 20px
      letter-spacing 5px
      text-align center
      cursor pointer
</style>

<style lang="stylus">
  .form-container
    .el-input__inner
      border: 2px solid #119d9f
      text-align center
      font-size 20px
      letter-spacing 5px
    .el-button
      margin 20px
      background #119d9f
      border: 1px solid #119d9f
      color white
      width 100px
</style>
