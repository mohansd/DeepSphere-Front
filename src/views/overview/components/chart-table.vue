<template>
  <div class="charts">
    <div class="title">{{title}}</div>
    <div :id="id" style="width: 100%;height: 200px;padding-left: 10px"></div>
    <table rules=none >
      <tr>
        <th></th>
        <th>min</th>
        <th>max</th>
        <th>avg</th>
        <th>current</th>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #b9dfb8;"></div>可用容量</td>
        <td>{{minval1}}</td>
        <td>{{maxval1}}</td>
        <td>{{avgval1}}</td>
        <td>{{curval1}}</td>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #f29b76;"></div>已用容量</td>
        <td>{{minval2}}</td>
        <td>{{maxval2}}</td>
        <td>{{avgval2}}</td>
        <td>{{curval2}}</td>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #6795f8;"></div>&ensp;&ensp;总容量</td>
        <td>{{minval3}}</td>
        <td>{{maxval3}}</td>
        <td>{{avgval3}}</td>
        <td>{{curval3}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { convertunit } from '@/utils/convert'
  export default {
    name: 'chart-table',
    props: {
      id: String,
      title: String,
      timelist: Array,
      data1: {
        type: Array,
        default: function() {
          return [0]
        }
      },
      data2: {
        type: Array,
        default: function() {
          return [0]
        }
      }
    },
    components: {
      echarts
    },
    computed: {
      chartdata1() {
        return this.data1
      },
      chartdata2() {
        return this.data2
      },
      minval1() {
        return convertunit(Math.min.apply(null, this.data1) - Math.min.apply(null, this.data2))
      },
      maxval1() {
        return convertunit(Math.max.apply(null, this.data1) - Math.max.apply(null, this.data2))
      },
      avgval1() {
        let sum1 = 0
        this.data1.forEach(item => {
          sum1 = sum1 + Number(item)
        })
        let sum2 = 0
        this.data2.forEach(item => {
          sum2 = sum2 + Number(item)
        })
        return convertunit((sum1 / this.data1.length) - (sum2 / this.data1.length))
      },
      curval1() {
        return convertunit(this.data1[this.data1.length - 1] - this.data2[this.data1.length - 1])
      },
      minval2() {
        return convertunit(Math.min.apply(null, this.data2))
      },
      maxval2() {
        return convertunit(Math.max.apply(null, this.data2))
      },
      avgval2() {
        let sum = 0
        this.data2.forEach(item => {
          sum = sum + Number(item)
        })
        return convertunit((sum / this.data2.length))
      },
      curval2() {
        return convertunit(this.data2[this.data2.length - 1])
      },
      minval3() {
        return convertunit(Math.min.apply(null, this.data1))
      },
      maxval3() {
        return convertunit(Math.max.apply(null, this.data1))
      },
      avgval3() {
        let sum = 0
        this.data1.forEach(item => {
          sum = sum + Number(item)
        })
        return convertunit((sum / this.data1.length))
      },
      curval3() {
        return convertunit(this.data1[this.data1.length - 1])
      }
    },
    data() {
      return {
        interval: null,
        myChart: null,
        xdata: this.timelist,
        option: {
          grid: {
            top: '5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#c5d7fc', '#f29b76'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['12:03', '12:04', '12:05', '12:06', '12:07', '12:08']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '总容量',
            data: [86.5, 86.5, 86.5, 86.5, 86.5, 86.5, 86.5],
            type: 'line',
            areaStyle: {}
          },
          {
            name: '已用',
            data: [20, 20, 20, 20, 20, 20, 20],
            type: 'line',
            areaStyle: {}
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
        this.interval = setInterval(() => {
          this.xdata.forEach((item, index) => {
            let time = new Date(item * 1000)
            this.option.xAxis.data[index] = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          })
          this.option.series[0].data = this.chartdata1
          this.option.series[1].data = this.chartdata2
          this.myChart.setOption(this.option)
          this.myChart.resize()
        }, 1000)
      }
    },
    beforeDestroy() {
      clearInterval(this.interval)
      this.myChart.clear()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .charts
    margin-top 7px
    width: 100%
    height: 320px
    background: #fff
    .title
      text-align center
      padding-top 8px
      padding-bottom 10px
    table
      margin-left 10%
      width: 80%
      font-size 12px
      color: rgb(102,102,102)
      td
        height: 20px
        line-height 20px
        text-align center
      th
        text-align center
      tr:nth-child(3)
        background: #eaf0fe
      .legend
        width: 20px
        height: 8px
        display: inline-block
        margin-right: 5px
</style>
