<template>
  <i-tabs :labels="labels">
    <template slot="用户管理">
      <user></user>
    </template>
    <template slot="用户组管理">
      <group-manage></group-manage>
    </template>
  </i-tabs>
</template>

<script>
  import iTabs from './../../components/Tabs/index'
  import user from './components/userManage'
  import groupManage from './components/groupManage'
  export default {
    name: 'userManage',
    components: {
      iTabs,
      user,
      groupManage
    },
    data() {
      return {
        labels: ['用户管理', '用户组管理'],
        value1: true,
        value2: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    margin-left 20px
    margin-top 20px
    font-weight 900
  .container
    margin-top 10px
    margin-left 20px
    width 95%
    background-color: #fff
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    padding-top 20px
    padding-left 30px
    padding-bottom 20px
    .label
      width 120px
      display inline-block
      text-align right
</style>
