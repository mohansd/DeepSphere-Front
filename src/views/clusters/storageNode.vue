<template>
  <div class="container">
    <el-button icon="el-icon-plus" class="my-button" type="primary" @click="dialogVisible1=true" size="medium">新增OSD</el-button>
    <el-button type="danger" size="medium" :disabled="isosd" @click="dialogVisible2 = true" icon="el-icon-close">删除OSD</el-button>
    <el-table
      border
      stripe
      highlight-current-row
      :span-method="objectSpanMethod"
      @current-change="handleCurrentChange"
      :data="tableData"
      style="width: 100%;margin-top: 20px;margin-bottom: 20px">
      <el-table-column
        prop="hostname"
        label="节点名">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="osd"
        label="OSD">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="device_class"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="numpg"
          label="PGs">
        </el-table-column>
        <el-table-column
          prop="used"
          label="使用情况">
        </el-table-column>
        <el-table-column
          prop="read_bytes"
          label="Read bytes">
        </el-table-column>
        <el-table-column
          prop="write_bytes"
          label="Write bytes">
        </el-table-column>
        <el-table-column
          prop="read_ops"
          label="Read ops">
        </el-table-column>
        <el-table-column
          prop="write_ops"
          label="Write ops">
        </el-table-column>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">修改状态</el-button>
        </template>
      </el-table-column>
    </el-table>

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
      <div class="form">
        <div class="label">设置设备类型： </div>
        <select id="device" style="width: 195px;background-color: #fff;height: 22px">
          <option value="hdd" label="hdd"></option>
          <option value="ssd" label="ssd"></option>
        </select>
      </div>
    </i-dialog>

    <i-dialog title="确定删除当前选中的OSD?" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">IP： </div>
        <div class="label">{{currentosd.ip}}</div>
      </div>
      <div class="form">
        <div class="label">OSD ID： </div>
        <div class="label">{{currentosd.id}}</div>
      </div>
    </i-dialog>

    <i-dialog title="修改OSD状态" :show="dialogVisible3"
              @confirmClicked="confirmClicked3"
              @cancelClicked="dialogVisible3 = false">
      <div class="form">
        <div class="label">IP： </div>
        <div class="label">{{currentosd.ip}}</div>
      </div>
      <div class="form">
        <div class="label">OSD ID： </div>
        <div class="label">{{currentosd.id}}</div>
      </div>
      <div class="form">
        <div class="label">in/out： </div>
        <select style="width: 195px;background-color: #fff;height: 22px;" id="in">
          <option value="inOSD" :selected="currentosd.stats.in">inOSD</option>
          <option value="outOSD" :selected="!currentosd.stats.in">outOSD</option>
        </select>
      </div>
      <div class="form">
        <div class="label">enable/disable： </div>
        <select style="width: 195px;background-color: #fff;height: 22px" id="enable">
          <option value="enableOSD" :selected="currentosd.stats.enable">enableOSD</option>
          <option value="disableOSD" :selected="!currentosd.stats.enable">disableOSD</option>
        </select>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, getDisk, createOSD, deleteOSD, setosdClass, setosdStatus } from '@/api/clusters/dataNode'
  import { convertunit } from '../../utils/convert'

  export default {
    name: 'storageNode',
    data() {
      return {
        nodeList: [],
        state: true,
        newNode: {
          hostname: '',
          disk: ''
        },
        currentosd: {
          name: '',
          ip: '',
          id: '',
          stats: {
            in: true,
            enable: true
          }
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
        tableData: [],
        pos: 0,
        spanArr: []
      }
    },
    mounted() {
      this.fetchData()
    },
    beforeDestroy() {},
    methods: {
      fetchData() {
        getList().then(res => {
          this.tableData = []
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              res.data.data.forEach(node => {
                const temp = node.osds.map(osd => {
                  return {
                    hostname: node.hostname,
                    ip: node.ip,
                    id: osd.id,
                    device_class: osd.device_class,
                    status: (osd.in === 1 ? 'in' : 'out') + ',' + (osd.up === 1 ? 'up' : 'down'),
                    numpg: osd.stats.numpg,
                    used: convertunit(osd.stats.stat_bytes) + '/' + convertunit(osd.stats.stat_bytes_used),
                    read_bytes: osd.stats.op_out_bytes,
                    write_bytes: osd.stats.op_in_bytes,
                    read_ops: osd.stats.op_r,
                    write_ops: osd.stats.op_w
                  }
                })
                this.tableData = this.tableData.concat(temp)
              })
              this.getSpanArr(this.tableData)
            }
          }
        })
      },
      handleEdit() {
        this.dialogVisible3 = true
      },
      getDisks() {
        if (this.ip) {
          getDisk(this.ip).then(res => {
            if (res.data.code === 0) {
              this.disks = res.data.data
            } else {
              this.$message({
                message: '出现错误，请确认后重试！',
                type: 'error'
              })
            }
          })
        }
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        this.nodeList.forEach(item => {
          if (this.ip === item.ip) {
            this.newNode.hostname = item.hostname
          }
        })
        this.newNode.disk = document.getElementById('disk').value
        createOSD(this.newNode).then(res => {
          if (res.data.code === 0) {
            this.setOSDClass(res.data.data.id)
          } else {
            this.$message({
              message: '新增OSD失败，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      setOSDClass(id) {
        let device = document.getElementById('device').value
        setosdClass(id, device).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增OSD成功！',
              type: 'success'
            })
            this.fetchData()
            this.newNode.hostname = ''
            this.newNode.disk = ''
          } else {
            this.$message({
              message: '新增OSD失败，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      handleCurrentChange(val) {
        if (val) {
          this.currentosd.id = val.id
          this.currentosd.ip = val.ip
          this.currentosd.stats.in = val.status.includes('in')
          this.currentosd.stats.enable = val.status.includes('up')
          this.isosd = false
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
        const inValue = document.getElementById('in').value
        const enableValue = document.getElementById('enable').value
        const inflag = (this.currentosd.stats.in ? 'inOSD' : 'outOSD') !== inValue
        const enableflag = (this.currentosd.stats.enable ? 'enableOSD' : 'disableOSD') !== enableValue
        if (inflag) {
          const params1 = {
            method: inValue,
            ip: this.currentosd.ip,
            osd_num: this.currentosd.id.toString()
          }
          setosdStatus(params1).then(res => {
            if (res.data.code === 0) {
              // this.dnsData = res.data.data
              this.fetchData()
              this.$message({
                message: 'OSD状态修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: 'OSD状态修改失败：' + res.data.message,
                type: 'error'
              })
            }
          })
        }
        if (enableflag) {
          const params2 = {
            method: enableValue,
            ip: this.currentosd.ip,
            osd_num: this.currentosd.id.toString()
          }
          setosdStatus(params2).then(res => {
            if (res.data.code === 0) {
              // this.dnsData = res.data.data
              this.fetchData()
              this.$message({
                message: 'OSD状态修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: 'OSD状态修改失败：' + res.data.message,
                type: 'error'
              })
            }
          })
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 1) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      getSpanArr(data) {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1)
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].hostname === data[i - 1].hostname) {
              this.spanArr[this.pos] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.pos = i
            }
          }
        }
      }
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
