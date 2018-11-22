<template>
  <div>
    <div class="logo"><img src="@/assets/img/logo1.png" width="350px" height="100px"/></div>
    <div class="form-container" align="center">
      <h1 class="title">输入产品密钥</h1>
      <svg-icon icon-class="licence" class="icon"></svg-icon>
      <el-input placeholder="输入产品密钥"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        key: ''
      }
    }
  }
</script>

<style scoped lang="stylus">
  .logo
    margin 50px auto auto 58px
  .form-container
    width 700px
    height: 400px
    margin auto
    .title
      font-size 40px
      letter-spacing 10px
      color: #4d4d4d
      text-align center
    .icon
      margin 60px auto 100px
      width 40%
      height 200px
</style>

<style lang="stylus">
  .form-container
    .el-input__inner
      border: 1px solid #119d9f
      text-align center
      font-size 20px
      letter-spacing 5px
</style>
