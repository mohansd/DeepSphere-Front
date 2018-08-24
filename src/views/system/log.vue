<template>
  <div>
    <div class="title">日志
      <el-button type="primary" style="margin-left: 70%" @click="downloadlog(log)" size="medium" icon="el-icon-download">导出</el-button></div>
    <div class="content">
      <div v-for="(item, index) in log" :key="index">
        <span>{{item.stamp}}</span>
        <span>{{item.priority}}</span>
        <span :style="{lineHeight: '22px', color: colors[index]}">{{item.message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getData } from '@/api/overview/overview'
  import FileSaver from 'file-saver'
  import lodash from 'lodash'
  export default {
    name: 'log',
    data() {
      return {
        log: [],
        colors: []
      }
    },
    methods: {
      fetchData() {
        getData().then(res => {
          let data = res.data.data.clog
          data.forEach((item, index) => {
            let stamp = item.stamp.substr(0, 19)
            this.log.push({
              stamp: stamp,
              priority: item.priority,
              message: item.message
            })
            if (item.priority === '[WRN]') {
              this.colors[index] = '#FFC200'
            } else if (item.priority === '[ERR]') {
              this.colors[index] = 'red'
            } else {
              this.colors[index] = '#333'
            }
            lodash.replace(item.message, 'ceph', 'Deep Sphere')
            lodash.replace(item.message, 'Ceph', 'Deep Sphere')
            lodash.replace(item.message, 'CEPH', 'Deep Sphere')
          })
          this.log.reverse()
          this.colors.reverse()
        })
      },
      downloadlog(log) {
        var blob = new Blob([JSON.stringify(log)], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, 'log.txt')
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
    margin-left 20px
    max-height: 700px
    padding-bottom 20px
    overflow auto
    width: 80%
    background-color #fff
    border 1px solid rgba(170, 170, 170, 0.5)
    padding-top 20px
    padding-left 20px
</style>
