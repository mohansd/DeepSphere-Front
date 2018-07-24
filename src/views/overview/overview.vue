<template>
    <div class="container">
      <div class="wrapper">
        <span class="title">集群状态</span>
        <el-row :gutter="15">
          <el-col :span="6">
            <status-box title="状态" num="HEALTHY" getcolor="green"></status-box>
          </el-col>
          <el-col :span="6">
            <line-chart title="存储池" id="storage"></line-chart>
          </el-col>
          <el-col :span="6">
            <line-chart title="集群容量" id="clustercapacity"></line-chart>
          </el-col>
          <el-col :span="6">
            <line-chart title="已用流量" id="usedcapacity"></line-chart>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper">
        <span class="title">OSD状态</span>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-row :gutter="6">
              <el-col :span="12">
                <status-box title="OSDs输入" num="6"></status-box>
              </el-col>
              <el-col :span="12">
                <status-box title="OSDs输出" num="0" getcolor="green"></status-box>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="6">
              <el-col :span="12">
                <status-box title="OSDs上升" num="6"></status-box>
              </el-col>
              <el-col :span="12">
                <status-box title="OSDs下降" num="0" getcolor="green"></status-box>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <line-chart title="平均OSD应用延迟" id="osdappliacation"></line-chart>
          </el-col>
          <el-col :span="6">
            <line-chart title="平均OSD提交延迟" id="osdsubmit"></line-chart>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper" style="height: 350px">
        <span class="title">集群</span>
        <el-row :gutter="15">
          <el-col :span="8">
            <chart-table id="capacity" title="容量"></chart-table>
          </el-col>
          <el-col :span="8">
            <chart-table id="IOPs" title="IOPs"></chart-table>
          </el-col>
          <el-col :span="8">
            <chart-table id="throughput" title="吞吐量"></chart-table>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper" style="height: 350px">
        <span class="title">延迟</span>
        <el-row :gutter="15">
          <el-col :span="16">
            <chart-table id="OSD" title="OSD应用+提交延迟"></chart-table>
          </el-col>
          <el-col :span="8">
            <chart-table id="monitor" title="监控延迟"></chart-table>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper" style="height: 350px">
        <span class="title">对象</span>
        <el-row :gutter="15">
          <el-col :span="24">
            <chart-table id="clusterobject" title="集群对象"></chart-table>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import statusBox from './components/statusBox'
  import lineChart from './components/chart'
  import chartTable from './components/chart-table'
  export default {
    name: 'overview',
    components: {
      statusBox,
      lineChart,
      chartTable
    }
  }
</script>

<style scoped lang="stylus">
.container
  padding-top 20px
  margin-left 51px
  margin-right 48px
  .wrapper
    height: 150px
    margin-bottom 44px
    .title
      font-size 18px
      font-weight 900
      color: #0b1137
</style>
