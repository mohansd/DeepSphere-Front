<template>
  <div class="box" :style="{backgroundColor: getcolor, color: wordcolor}">
    <div class="title" >{{title}}</div>
    <div class="show">{{num}}</div>
  </div>
</template>

<script>
    export default {
      name: 'statusBox',
      props: {
        title: String,
        num: String,
        getcolor: String
      },
      computed: {
        wordcolor() {
          return this.getcolor === 'green' ? '#fff' : '#333' // 绿底白字
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .box
    background: #fff;
    width:100%;
    height: 100px;
    margin-top 7px
    display inline-block
    border-radius 5px
    .title
      padding-top 8px
      text-align: center
    .show
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-size: 25px;
      font-weight: 900
</style>
