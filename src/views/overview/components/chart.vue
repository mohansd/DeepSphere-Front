<template>
  <div class="box">
    <div class="title">{{title}}</div>
    <div style="position: absolute;Z-index: 100;padding-left: 11%;
      height: 60px;
      line-height: 60px;
      font-size: 25px;
      font-weight: 900">10</div>
    <div :id="id" style="position: relative;width: 100%;height: 90%;Z-index: 90"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'chart',
    props: {
      title: String,
      id: String
    },
    components: {
      echarts
    },
    data() {
      return {
        mychart: null,
        option: {
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 35
          },
          xAxis: {
            show: true,
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: 'rgba(170,170,170,0.2)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(170,170,170,0.2)'
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            show: true,
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(170,170,170,0.2)'
              }
            },
            type: 'value'
          },
          series: [{
            data: [86.5, 86.5, 86.5, 86.5, 86.5, 86.5, 86.5],
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: '#6795f8'
            },
            areaStyle: {
              color: 'rgba(197,215,252,0.3)'
            }
          }]
        }
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.myChart = echarts.init(document.getElementById(this.id))
        this.myChart.setOption(this.option)
      }
    }
  }
</script>

<style scoped lang="stylus">
.box
  width 100%
  height: 100px
  background: #fff
  margin-top 7px
  .title
    padding-top 8px
    text-align: center
    padding-bottom 10px
  .data
    text-align center
    height: 90%
    Z-index: 10
</style>
