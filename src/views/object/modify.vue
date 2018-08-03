<template>
  <div class="container">
    <span style="padding-left: 30px">修改对象网关服务端口：</span>
    <br/>
    <br/>
    <br/>
    <span style="padding-left: 30px">端口号： </span>
    <input placeholder="输入端口号"/>
    <br/>
    <i-button type="primary" text="确定" style="padding-top: 20px;padding-left: 100px"></i-button>
    <i-button type="primary" text="重置" ></i-button>
  </div>
</template>

<script>
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'modify',
    components: {
      iButton
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container
  border: 0.5px solid rgba(190, 190, 190, 0.5)
  margin-top 1%
  margin-left 1%
  width 80%
  height: 200px
  background-color #fff
  position absolute
  padding-top 30px
</style>
