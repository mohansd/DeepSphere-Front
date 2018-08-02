<template>
  <div>
    <div class="title">日志
      <el-button type="primary" style="margin-left: 70%">刷新</el-button></div>
    <div class="content">
      <div v-for="item in log" :key="item">{{item}}</div>
    </div>
  </div>
</template>

<script>
  import { getData } from '@/api/overview/overview'
  export default {
    name: 'log',
    data() {
      return {
        log: []
      }
    },
    methods: {
      fetchData() {
        getData().then(res => {
          let data = res.data.data.clog
          data.forEach(item => {
            this.log.push(item.stamp + item.priority + item.who + item.message)
          })
          console.log(this.log)
        })
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    padding-top 20px
    margin-left: 20px
    height: 50px
    font-weight 900
  .content
    margin-top 20px
    margin-left 20px
    height: 700px
    width: 80%
    background-color #fff
    border 1px solid rgba(170, 170, 170, 0.5)
    padding-top 20px
    padding-left 20px
</style>
