<template>
    <el-tabs class="my-tabs" v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in labels" :key="index" :label="item" :name="item">
        <slot :name="item"></slot>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
      name: 'index',
      props: {
        labels: Array
      },
      data() {
        return {
          activeName2: this.labels[0]
        }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event)
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-tabs.el-tabs--card>.el-tabs__header
    background-color #BDDBF5
    height: 40px
    padding-left 20px
    padding-top 10px
  .my-tabs.el-tabs--card>.el-tabs__header .el-tabs__item
    padding-bottom 0
    background-color #1262aa
    height 40px
    line-height 40px
    color #fff
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  .my-tabs.el-tabs--card>.el-tabs__header .el-tabs__item.is-active
    background-color #f3f3f3
    color #333
</style>
