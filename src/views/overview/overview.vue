<template>
    <div class="container">
      <div class="item">
        <span class="title">集群状态</span>
        <el-row :gutter="15">
          <el-col :lg="6" :sm="12">
            <status-box title="状态" :num="health.status" :getcolor="health.color"></status-box>
          </el-col>
          <el-col :lg="6" :sm="12">
            <line-chart title="存储池" id="storage" :datas="Poolbyte"></line-chart>
          </el-col>
          <el-col :lg="6" :sm="12">
            <line-chart title="集群容量" id="clustercapacity" :datas="clusterByte"></line-chart>
          </el-col>
          <el-col :lg="6" :sm="12">
            <line-chart title="已用流量" id="usedcapacity" :datas="usedclusterByte"></line-chart>
          </el-col>
        </el-row>
      </div>
      <div class="item">
        <span class="title">OSD状态</span>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-row :gutter="6">
              <el-col :span="12">
                <status-box title="OSDs活跃" :num="OSDsState.in"></status-box>
              </el-col>
              <el-col :span="12">
                <status-box title="OSDs删除" :num="OSDsState.out" getcolor="green"></status-box>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="6">
              <el-col :span="12">
                <status-box title="OSDs开启" :num="OSDsState.up"></status-box>
              </el-col>
              <el-col :span="12">
                <status-box title="OSDs关闭" :num="OSDsState.down" getcolor="green"></status-box>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <line-chart title="平均OSD应用延迟" id="osdappliacation" :datas="avgapplylate"></line-chart>
          </el-col>
          <el-col :span="6">
            <line-chart title="平均OSD提交延迟" id="osdsubmit" :datas="avgcommitlate"></line-chart>
          </el-col>
        </el-row>
      </div>
      <div class="item">
        <span class="title">集群</span>
        <el-row :gutter="15">
          <el-col :span="8">
            <chart-table id="capacity" title="容量" :timelist="timelist" :data1="clusterByte.chartData" :data2="usedclusterByte.chartData"></chart-table>
          </el-col>
          <el-col :span="8">
            <iops id="IOPs" title="IOPs" :timelist="timelist" :data1="IOPsread" :data2="IOPswrite"></iops>
          </el-col>
          <el-col :span="8">
            <throughput id="throughput" title="吞吐量" :timelist="timelist" :data1="throughputr" :data2="throughputw"></throughput>
          </el-col>
        </el-row>
      </div>
      <div class="item">
        <span class="title">延迟</span>
        <el-row :gutter="15">
          <el-col :span="16">
            <osd id="OSD" title="OSD应用+提交延迟" :timelist="timelist" :data1="avgcommitlate.chartData" :data2="avgapplylate.chartData"></osd>
          </el-col>
          <el-col :span="8">
            <chart-table id="monitor" title="监控延迟" :timelist="timelist"></chart-table>
          </el-col>
        </el-row>
      </div>
      <div class="item">
        <span class="title">对象</span>
        <el-row :gutter="15">
          <el-col :span="24">
            <objects id="clusterobject" title="集群对象" :timelist="timelist" :data1="clusterObject"></objects>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import { convertunit } from '@/utils/convert'
  import { getData } from '@/api/overview/monitor'
  import statusBox from './components/statusBox'
  import lineChart from './components/chart'
  import chartTable from './components/chart-table'
  import iops from './components/IOPs'
  import throughput from './components/throughput'
  import osd from './components/OSD'
  import objects from './components/objects'
  export default {
    name: 'overview',
    components: {
      statusBox,
      lineChart,
      chartTable,
      iops,
      throughput,
      osd,
      objects
    },
    data() {
      return {
        interval: null,
        time: 5,
        timelist: [],
        health: {
          status: 'HEALTH',
          color: 'green'
        },
        OSDsState: {
          in: '',
          out: '',
          up: '',
          down: ''
        },
        start: ((+new Date() - 1000 * 60 * 5) / 1000).toFixed(0),
        end: ((+new Date()) / 1000).toFixed(0),
        step: 60,
        Poolbyte: {
          showData: '',
          chartData: []
        },
        clusterByte: {
          showData: '',
          chartData: []
        },
        usedclusterByte: {
          showData: '',
          chartData: []
        },
        avgcommitlate: {
          showData: '',
          chartData: []
        },
        avgapplylate: {
          showData: '',
          chartData: []
        },
        IOPsread: [],
        IOPswrite: [],
        throughputr: [],
        throughputw: [],
        clusterObject: []
      }
    },
    methods: {
      initdashboard() {
        this.interval = setInterval(() => {
          this.start = ((+new Date() - 1000 * 60 * 5) / 1000).toFixed(0)
          this.end = ((+new Date()) / 1000).toFixed(0)
          this.getAllData()
        }, 5000)
      },
      getAllData() {
        this.getHealth()
        this.getOSDsin()
        this.getOSDsout()
        this.getOSDsup()
        this.getOSDsdown()
        this.getPoolbyte()
        this.getClusterbyte()
        this.getClusterusedbyte()
        this.getavgapplylate()
        this.getavgcommitlate()
        this.getIOPSread()
        this.getIOPSwrite()
        this.getthroughputr()
        this.getthroughputw()
        this.getObjects()
      },
      getHealth() {
        let params = {
          query: 'ceph_health_status',
          start: this.start,
          end: this.end,
          step: this.step
        }
        // const now = ((+new Date()) / 1000).toFixed(0) - 1
        getData(params).then(res => {
          const data = res.data.data.data.result[0].values
          if (data[this.time][1] === '2') {
            this.health.status = 'ERROR'
            this.health.color = 'red'
          } else if (data[this.time][1] === '1') {
            this.health.status = 'WARN'
            this.health.color = 'yellow'
          } else {
            this.health.status = 'HEALTHY'
            this.health.color = 'green'
          }
        })
      },
      getOSDsin() {
        let params = {
          query: 'sum(ceph_osd_in)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          const data = res.data.data.data.result[0].values
          this.OSDsState.in = data[this.time][1].toString()
        })
      },
      getOSDsout() {
        let params = {
          query: 'count(ceph_osd_up)%20-%20count(ceph_osd_in)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          const data = res.data.data.data.result[0].values
          this.OSDsState.out = data[this.time][1]
        })
      },
      getOSDsup() {
        let params = {
          query: 'sum(ceph_osd_up)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          const data = res.data.data.data.result[0].values
          this.OSDsState.up = data[this.time][1].toString()
        })
      },
      getOSDsdown() {
        let params = {
          query: 'count(ceph_osd_up%20%3D%3D%200)%20OR%20vector(0)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          const data = res.data.data.data.result[0].values
          this.OSDsState.down = data[this.time][1]
        })
      },
      getPoolbyte() {
        let params = {
          query: 'count(ceph_pool_bytes_used)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.Poolbyte.chartData = []
          const data = res.data.data.data.result[0].values
          this.Poolbyte.showData = data[5][1]
          data.forEach(item => {
            this.Poolbyte.chartData.push(item[1])
          })
        })
      },
      getClusterbyte() {
        let params = {
          query: 'ceph_cluster_total_bytes',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.clusterByte.chartData = []
          let data = res.data.data.data.result[0].values
          this.clusterByte.showData = convertunit(data[5][1])
          data.forEach((item, index) => {
            this.clusterByte.chartData.push(item[1])
            this.timelist[index] = item[0]
          })
        })
      },
      getClusterusedbyte() {
        let params = {
          query: 'ceph_cluster_total_used_bytes',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.usedclusterByte.chartData = []
          const data = res.data.data.data.result[0].values
          this.usedclusterByte.showData = convertunit(data[5][1])
          console.log(convertunit(data[5][1]))
          data.forEach(item => {
            this.usedclusterByte.chartData.push(item[1])
          })
        })
      },
      getavgapplylate() {
        let params = {
          query: 'avg(ceph_osd_apply_latency_ms)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.avgapplylate.chartData = []
          const data = res.data.data.data.result[0].values
          this.avgapplylate.showData = Number(data[5][1]).toFixed(2) + 'ms'
          data.forEach(item => {
            this.avgapplylate.chartData.push(item[1])
          })
        })
      },
      getavgcommitlate() {
        let params = {
          query: 'avg(ceph_osd_commit_latency_ms)',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.avgcommitlate.chartData = []
          const data = res.data.data.data.result[0].values
          this.avgcommitlate.showData = Number(data[5][1]).toFixed(2) + 'ms'
          data.forEach(item => {
            this.avgcommitlate.chartData.push(item[1])
          })
        })
      },
      getIOPSread() {
        let params = {
          query: 'sum(rate(ceph_osd_op_r%5B1m%5D))',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.IOPsread = []
          const data = res.data.data.data.result[0].values
          data.forEach(item => {
            this.IOPsread.push(Number(item[1]).toFixed(2))
          })
        })
      },
      getIOPSwrite() {
        let params = {
          query: 'sum(rate(ceph_osd_op_w%5B1m%5D))',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.IOPswrite = []
          const data = res.data.data.data.result[0].values
          data.forEach(item => {
            this.IOPswrite.push(Number(item[1]).toFixed(2))
          })
        })
      },
      getthroughputr() {
        let params = {
          query: 'sum(irate(ceph_osd_op_r_out_bytes%5B1m%5D))',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.throughputr = []
          const data = res.data.data.data.result[0].values
          data.forEach(item => {
            this.throughputr.push((Number(item[1]) / (1024 * 1024)).toFixed(2))
          })
        })
      },
      getthroughputw() {
        let params = {
          query: 'sum(irate(ceph_osd_op_w_in_bytes%5B1m%5D))',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.throughputw = []
          const data = res.data.data.data.result[0].values
          data.forEach(item => {
            this.throughputw.push((Number(item[1] / (1024 * 1024))).toFixed(2))
          })
        })
      },
      getObjects() {
        let params = {
          query: 'ceph_cluster_total_objects',
          start: this.start,
          end: this.end,
          step: this.step
        }
        getData(params).then(res => {
          this.clusterObject = []
          const data = res.data.data.data.result[0].values
          data.forEach(item => {
            this.clusterObject.push((Number(item[1])))
          })
        })
      }
    },
    mounted() {
      this.getAllData()
      this.initdashboard()
    },
    beforeDestroy() {
      clearInterval(this.interval)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container
  padding-top: 20px
  margin: 0 48px 0 51px
  .item
    min-height: 150px
    margin-bottom 50px
    .title
      font-size 18px
      font-weight 900
      color: #0b1137
</style>
