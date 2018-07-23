<template>
  <div style="margin-bottom: 20px;display: inline-block;margin-right: 10px">
    <el-button class="my-button3" type="danger" icon="el-icon-close" v-if="type==='delete'">删除</el-button>
    <el-button class="my-button2" type="primary" icon="el-icon-refresh" v-else-if="type==='refresh'">刷新</el-button>
    <el-button class="my-button1" type="primary" :icon="icon" v-else>{{text}}</el-button>
  </div>
</template>

<script>
    export default {
      name: 'iButton',
      props: {
        type: String,
        icon: String,
        text: String
      }
    }
</script>

<style lang="stylus">
  .my-button1.el-button--primary
    height: 35px
    line-height 35px
    background-color #1262AA
    padding-left 15px
    padding-top 0
    border-color #1262AA
  .my-button1.el-button--primary:focus, .my-button1.el-button--primary:hover
    background-color #2078C5
    border-color #2078C5
  .my-button2.el-button
    width: 80px
    height: 35px
    line-height 35px
    color: #fff
    text-align center
    padding-left 15px
    padding-top 0
  .my-button3.el-button
    width: 80px
    height: 35px
    line-height 35px
    text-align center
    padding-left 15px
    padding-top 0
</style>
