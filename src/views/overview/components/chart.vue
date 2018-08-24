<template>
  <div class="box">
    <div class="title">{{title}}</div>
    <div style="position: absolute;Z-index: 100;padding-left: 10%;
      height: 60px;
      line-height: 60px;
      font-size: 25px;
      font-weight: 900">{{datas.showData}}</div>
    <div :id="id" style="position: relative;width: 100%;height: 90%;Z-index: 90"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'chart',
    props: {
      title: String,
      id: String,
      datas: Object
    },
    components: {
      echarts
    },
    computed: {
      showData() {
        const showData = this.datas.showData
        const digital = parseFloat(showData.replace(/[^\d.]/g, '')).toFixed(2)
        const unit = showData.replace(/[^\a-z]/g, '')
        return digital + unit
      },
      chartData() {
        let arr = []
        this.datas.chartData.forEach(item => {
          arr.push(item)
        })
        return arr
      }
    },
    data() {
      return {
        interval: null,
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
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
            data: [],
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
    beforeDestroy() {
      clearInterval(this.interval)
    },
    methods: {
      initChart() {
        this.myChart = echarts.init(document.getElementById(this.id))
        this.interval = setInterval(() => {
          this.option.series[0].data = this.chartData
          this.myChart.setOption(this.option)
          this.myChart.resize()
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
