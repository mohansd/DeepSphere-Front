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
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #f29b76;"></div>已用容量</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
      </tr>
      <tr>
        <td ><div class="legend" style="background: #6795f8;"></div>&ensp;&ensp;总容量</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
        <td>85.6Tib</td>
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
      title: String
    },
    components: {
      echarts
    },
    data() {
      return {
        mychart: null,
        option: {
          grid: {
            top: '5%'
          },
          color: ['#c5d7fc', '#b9dfb8'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['12:03', '12:04', '12:05', '12:06', '12:07', '12:08', '12:09']
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
        this.myChart.setOption(this.option)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .charts
    margin-top 7px
    width: 100%
    height: 100%
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
