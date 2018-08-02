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
        <td ><div class="legend" style="background: #b9dfb8;"></div>写</td>
        <td>{{minval2}}</td>
        <td>{{maxval2}}</td>
        <td>{{avgval2}}</td>
        <td>{{curval2}}</td>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #6795f8;"></div>读</td>
        <td>{{minval1}}</td>
        <td>{{maxval1}}</td>
        <td>{{avgval1}}</td>
        <td>{{curval1}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import echarts from 'echarts'
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
        return Math.min.apply(null, this.data1)
      },
      maxval1() {
        return Math.max.apply(null, this.data1)
      },
      avgval1() {
        let sum = 0
        this.data1.forEach(item => {
          sum = sum + Number(item)
        })
        return (sum / this.data1.length).toFixed(1)
      },
      curval1() {
        return this.data1[this.data1.length - 1]
      },
      minval2() {
        return Math.min.apply(null, this.data2)
      },
      maxval2() {
        return Math.max.apply(null, this.data2)
      },
      avgval2() {
        let sum = 0
        this.data2.forEach(item => {
          sum = sum + Number(item)
        })
        return (sum / this.data2.length).toFixed(3)
      },
      curval2() {
        return this.data2[this.data2.length - 1]
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
          color: ['#c5d7fc', '#b9dfb8'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['12:03', '12:04', '12:05', '12:06', '12:07', '12:08']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'IOPs读',
            data: [86.5, 86.5, 86.5, 86.5, 86.5, 86.5, 86.5],
            type: 'line',
            areaStyle: {}
          },
          {
            name: 'IOPs写',
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
        }, 1000)
      }
    },
    beforeDestroy() {
      clearInterval(this.interval)
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
