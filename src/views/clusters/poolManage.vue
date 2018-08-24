<template>
  <i-tabs :labels="labels">
    <template slot="数据池管理">
      <pool></pool>
    </template>
    <template slot="缓存池配置">
      <tiers></tiers>
    </template>
  </i-tabs>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iTabs from './../../components/Tabs/index'
  import pool from './components/pool'
  import tiers from './components/tiers'
  export default {
    name: 'shelfManage',
    components: {
      iTable,
      iTabs,
      pool,
      tiers
    },
    data() {
      return {
        labels: ['数据池管理', '缓存池配置']
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block;
        width: 120px;
        text-align: right
</style>
