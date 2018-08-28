<template>
  <div class="container">
    <el-button icon="el-icon-plus" class="my-button" type="primary" @click="dialogVisible1=true" size="medium">新增OSD</el-button>
    <el-button icon="el-icon-edit" class="my-button"
               :disabled="state"
               type="primary" @click="dialogVisible3=true" size="medium">设备类型</el-button>
    <i-table :osd="isosd" :osdlabels="osdlabels"
             :osdData="osdData" :tabledata="tabledata"
             :showedit="false"
             @currentchange="currentchange"
             @clickDelete="handleDelete"
             :labels="labels"
             edit="配置"
              style="margin-top: 20px"></i-table>
    <i-dialog title="新增OSD" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">IP： </div>
        <input v-model="ip"/>
        <el-button size="mini" type="primary" @click="getDisks">查询分区</el-button>
      </div>
      <div class="form">
        <div class="label">选择数据分区： </div>
        <select style="width: 195px;background-color: #fff;height: 22px" id="disk">
          <option v-for="item in disks" :key="item" :value="item">{{item}}</option>
        </select>
      </div>
    </i-dialog>
    <i-dialog title="确定删除OSD?" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">IP： </div>
        <div class="label">{{currentosd.ip}}</div>
      </div>
      <div class="form">
        <div class="label">OSD： </div>
        <div class="label">{{currentosd.name}}</div>
      </div>
    </i-dialog>
    <i-dialog title="配置设备类型" :show="dialogVisible3"
              @confirmClicked="confirmClicked3"
              @cancelClicked="cancelClicked3">
      <div class="form">
        <div class="label">OSD： </div>
        <div class="label">{{currentosd.name}}</div>
      </div>
      <div class="form">
        <div class="label">当前设备类型： </div>
        <div class="label">{{currentosd.device_class}}</div>
      </div>
      <div class="form">
        <div class="label">修改设备类型： </div>
        <select id="device" style="width: 120px">
          <option value="hdd" label="hdd"></option>
          <option value="ssd" label="ssd"></option>
        </select>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, getDisk, createOSD, deleteOSD, getosdTree, setosdClass } from '@/api/clusters/dataNode'
  import iTable from './../../components/Table/nodeTable'
  export default {
    name: 'storageNode',
    components: {
      iTable
    },
    data() {
      return {
        state: true,
        newNode: {
          hostname: '',
          disk: ''
        },
        currentosd: {
          name: '',
          ip: '',
          id: '',
          device_class: ''
        },
        osdid: '',
        ip: '',
        disks: [],
        currentNode: {},
        time: null,
        isosd: true,
        osdData: [],
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        tabledata: [],
        osdlabels: [{
          label: 'ID',
          prop: 'id'
        }, {
          label: '设备类型',
          prop: 'device_class'
        }, {
          label: '状态',
          prop: 'state'
        }, {
          label: 'PGs',
          prop: 'numpg'
        }, {
          label: '使用',
          prop: 'usage'
        }, {
          label: 'Read bytes',
          prop: 'op_out_bytes'
        }, {
          label: 'Write bytes',
          prop: 'op_in_bytes'
        }, {
          label: 'Read ops',
          prop: 'op_r'
        }, {
          label: 'Write ops',
          prop: 'op_w'
        }],
        labels: [
          {
            label: '节点名',
            prop: 'hostname'
          }, {
            label: 'IP',
            prop: 'ip'
          }]
      }
    },
    methods: {
      refresh() {
        // this.time = setInterval(() => {
        //   this.fetchData()
        // }, 1000)
      },
      fetchData() {
        getList().then(res => {
          const data = res.data.data
          this.tabledata = []
          data.forEach(osd => {
            if (osd.osds.length === 0) {
              if (osd.ip !== '') {
                this.tabledata.push({
                  hostname: osd.hostname,
                  ip: osd.ip
                })
              }
            } else {
              osd.osds.forEach(item => {
                this.tabledata.push({
                  hostname: osd.hostname,
                  osdid: '',
                  ip: osd.ip,
                  id: item.id,
                  device_class: '',
                  state: this.translatein(item.in) + ',' + this.translateup(item.up),
                  numpg: item.stats.numpg,
                  usage: (item.stats.stat_bytes_used / (1024 * 1024 * 1024)).toFixed(1) +
                  'GiB/' + (item.stats.stat_bytes / (1024 * 1024 * 1024 * 1024)).toFixed(1) +
                  'TiB',
                  op_out_bytes: item.stats.op_out_bytes,
                  op_in_bytes: item.stats.op_in_bytes,
                  op_r: item.stats.op_r,
                  op_w: item.stats.op_w
                })
              })
              getosdTree().then(res => {
                console.log(res.data.data.nodes)
                let nodes = res.data.data.nodes
                nodes.forEach(node => {
                  if (node.device_class) {
                    this.tabledata.forEach(item => {
                      if (item.id === node.name) {
                        item.device_class = node.device_class
                        item.osdid = node.id
                      }
                    })
                  }
                })
              })
            }
          })
        })
      },
      translatein(val) {
        if (val === 1) {
          return 'in'
        } else {
          return 'out'
        }
      },
      translateup(val) {
        if (val === 1) {
          return 'up'
        } else {
          return 'down'
        }
      },
      getDisks() {
        getDisk(this.ip).then(res => {
          if (res.data.code === 0) {
            this.disks = res.data.data
            console.log(res.data.data)
          } else {
            this.$message({
              message: '出现错误，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        this.tabledata.forEach(item => {
          if (this.ip === item.ip) {
            this.newNode.hostname = item.hostname
          }
        })
        this.newNode.disk = document.getElementById('disk').value
        console.log(this.newNode)
        createOSD(this.newNode).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.fetchData()
            this.newNode.hostname = ''
            this.newNode.disk = ''
          } else {
            this.$message({
              message: '出现错误，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      currentchange(val) {
        this.currentosd.name = val.id
        this.currentosd.device_class = val.device_class
        if (val.id) {
          this.state = false
          this.osdid = val.osdid
        } else {
          this.state = true
        }
      },
      handleDelete(val) {
        this.dialogVisible2 = true
        this.currentosd.ip = val.ip
        this.currentosd.name = val.id
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        deleteOSD(this.currentosd).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '出现错误，请重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      confirmClicked3() {
        this.dialogVisible3 = false
        let device = document.getElementById('device').value
        setosdClass(this.osdid, device).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '修改设备类型成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '出现错误，请重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked3() {
        this.dialogVisible3 = false
      }
    },
    mounted() {
      this.fetchData()
      this.refresh()
    },
    beforeDestroy() {
      clearInterval(this.time)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    .my-button.el-button--primary
      background-color #1262AA
      border-color #1262AA
    .my-button.el-button--primary:focus, .my-button.el-button--primary:hover
      background-color #2078C5
      border-color #2078C5
    .my-button.el-button--primary.is-disabled, my-button.el-button--primary.is-disabled:focus, my-button.el-button--primary.is-disabled:hover
      background-color #a0cfff
      border-color #a0cfff
      color: #fff
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block;
        width: 120px;
        text-align: right
</style>
