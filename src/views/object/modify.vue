<template>
  <div class="container">
    <p style="font-weight: bolder">修改对象网关服务端口</p>
    <div class="form-container">
      <el-form ref="form" label-width="80px" size="mini" style="width: 300px">
        <el-form-item label="端口号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-button" type="primary">确定</el-button>
          <el-button class="my-button" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  padding 20px
  .form-container
    background-color #fff
    border 0.5px solid rgba(190,190,190,0.5)
    margin-top 20px
    padding 20px
    .my-button.el-button--primary
      background-color #1262AA border-color #1262AA
    .my-button.el-button--primary:focus, .my-button.el-button--primary:hover
      background-color #2078C5
      border-color #2078C5
    .my-button.el-button--primary.is-disabled, my-button.el-button--primary.is-disabled:focus, my-button.el-button--primary.is-disabled:hover
      background-color #a0cfff
      border-color #a0cfff
      color: #fff
</style>
