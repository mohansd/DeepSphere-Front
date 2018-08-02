<template>
  <div class="container">
    <el-row >
      <el-col :span="11" :offset="1">
        <div class="box" style="height: 100px">
          <div class="title">状态</div>
          <div style="padding-top: 15px;padding-left: 20px">
            总体状况： <span :style="{color: statusColor}">{{status}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="10" :offset="1">
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="12">
              <el-row style="background-color: #fff;height: 100px">
                <el-col :span="8" class="svg-wrapper">
                  <svg-icon icon-class="datanode"></svg-icon>
                </el-col>
                <el-col :span="16">
                  <div class="node-title">监测节点</div>
                  <div class="node-content">{{monNode.num}} (quorum
                    <span v-for="num in monNode.quorum" :key="num">{{num}} </span>)
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row style="background-color: #fff;height: 100px">
                <el-col :span="8" class="svg-wrapper">
                  <svg-icon icon-class="monitornode"></svg-icon>
                </el-col>
                <el-col :span="16">
                  <div class="node-title">元数据节点</div>
                  <div class="node-content">1活动，0待机</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12">
            <el-row style="background-color: #fff;height: 100px">
              <el-col :span="8" class="svg-wrapper">
                <svg-icon icon-class="OSDS"></svg-icon>
              </el-col>
              <el-col :span="16">
                <div class="node-title">OSDS</div>
                <div class="node-content">{{OSDs.num}}({{OSDs.upnum}}up,{{OSDs.innum}}in)</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="background-color: #fff;height: 100px">
              <el-col :span="8" class="svg-wrapper">
                <svg-icon icon-class="setting"></svg-icon>
              </el-col>
              <el-col :span="16">
                <div class="node-title">管理节点</div>
                <div class="node-content">活动节点： {{mgrNode.active_name}}, {{mgrNode.standbys}}待机</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="11" :offset="1">
        <div class="box" style="height: 300px">
          <div class="title">使用情况</div>
          <el-row style="margin-top: 40px">
            <el-col :span="8">
              <div style="font-size: 50px;font-weight:900;text-align: center;height: 150px;line-height: 150px">{{objects}}k</div>
              <div style="text-align: center;font-weight:900">objects</div>
            </el-col>
            <el-col :span="8">
              <div style="height: 150px;padding-left: 20px">
                <el-progress type="circle" :percentage="percentage" color="#333" ></el-progress>
              </div>
              <div style="padding-left: 20px;font-weight:900">Raw capacity<br/>({{usedraw}}GiB used)</div>
            </el-col>
            <el-col :span="8">
              <div style="height: 150px">
                <div id="pool-used" style="width: 80%;height: 100%"></div>
              </div>
              <div style="font-weight:900;padding-left: 20%">Usage by pool</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10" :offset="1">
        <div class="box" style="height: 500px">
          <div class="title">数据池</div>
          <table>
            <tr>
              <th>名称</th>
              <th>对象数</th>
              <th>使用情况</th>
              <th>活动</th>
            </tr>
            <tr v-for="item in poolData" :key="item.name">
              <td>{{item.name}}</td>
              <td>{{item.objects}}</td>
              <td>{{item.usage}}</td>
              <td>{{item.active}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getData } from '@/api/overview/overview'
  import echarts from 'echarts'
  export default {
    name: 'monitor',
    data() {
      return {
        time: null,
        mychart: null,
        status: '',
        monNode: {
          num: 0,
          quorum: []
        },
        OSDs: {
          num: 0,
          upnum: 0,
          innum: 0
        },
        mgrNode: {
          active_name: ''
        },
        objects: 0,
        percentage: 0,
        usedraw: 0,
        option: {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}GiB ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: []
            }
          ]
        },
        poolData: []
      }
    },
    methods: {
      fetchData() {
        getData().then(res => {
          const data = res.data.data
          console.log(data)
          this.status = data.health.status
          this.mgrNode = data.mgr_status
          this.monNode.num = data.mon_quorum.length
          this.monNode.quorum = data.mon_quorum
          this.objects = (data.stats.total_objects / 1000).toFixed(1)
          this.usedraw = (data.stats.total_used_bytes / 1073741824).toFixed(1)
          this.percentage = (data.stats.total_used_bytes / data.stats.total_bytes).toFixed(2) * 100
          data.osds.forEach(item => {
            this.OSDs.num++
            if (item.in === 1) {
              this.OSDs.innum++
            }
            if (item.up === 1) {
              this.OSDs.upnum++
            }
          })
          data.pools.forEach(item => {
            this.option.series[0].data.push({
              value: (item.stats.bytes_used / 1073741824).toFixed(2),
              name: item.name
            })
            this.poolData.push({
              name: item.name,
              objects: item.stats.objects,
              usage: (item.stats.bytes_used / 1000).toFixed(2) + 'k/' + (item.stats.max_avail / 1000000000000).toFixed(1) + 'T',
              active: item.stats.rd + 'rd, ' + item.stats.wr + 'wr'
            })
          })
          console.log(this.poolData)
          this.initChart()
          console.log(data)
        })
      },
      initChart() {
        this.myChart = echarts.init(document.getElementById('pool-used'))
        this.myChart.setOption(this.option)
      }
    },
    computed: {
      statusColor: function() {
        if (this.status === 'HEALTH_OK') {
          return 'green'
        } else if (this.status === 'HEALTH_ERROR') {
          return 'red'
        } else {
          return 'yellow'
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container
  .box
    margin-top 20px
    display inline-block
    height: 300px
    width 100%
    background-color: #fff
    margin-bottom 40px
    box-shadow: 0px 0px 10px 5px #D3D8DD
    .title
      padding-left 20px
      padding-top 10px
      font-weight bolder
      color: #333
    table
      width: 90%
      margin-left: 5%
      height: 90%
      th
        text-align left
        height 10%
      td
        border-top 1px solid rgba(170, 170, 170, 0.5)
        height 8%
        line-height 8%
  .svg-wrapper
    background-color darkgrey
    font-size 60px
    line-height 100px
    text-align center
  .node-title
    padding-top 5px
    height: 20%
  .node-content
    margin-top 20px
    font-size 18px
    font-weight 900
</style>
