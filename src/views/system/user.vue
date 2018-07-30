<template>
  <div class="container">
    <span style="padding-left: 30px">修改用户密码：</span>
    <br/>
    <br/>
    <span style="padding-left: 30px;width: 150px;text-align: right;display: inline-block">原密码： </span>
    <input />
    <br/>
    <span style="margin-top:10px;padding-left: 30px;width: 150px;text-align: right;display: inline-block">新密码： </span>
    <input />
    <br/>
    <span style="margin-top:10px;padding-left: 30px;width: 150px;text-align: right;display: inline-block">确认密码： </span>
    <input />
    <br/>
    <i-button type="primary" text="确定" style="padding-top: 20px;padding-left: 100px"></i-button>
    <i-button type="primary" text="重置" ></i-button>
  </div>
</template>

<script>
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'user',
    components: {
      iButton
    }
  }
</script>

<style scoped lang="stylus">
  .container
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    margin-top 1%
    margin-left 1%
    width 80%
    height: 220px
    background-color #fff
    position absolute
    padding-top 30px
</style>
