<template>
  <div>
    <!--<el-alert-->
      <!--show-icon-->
      <!--v-show="hasFix"-->
      <!--title="DNS记录已修改，请重启配置文件。若不重启，离开或刷新页面时当前修改将失效。"-->
      <!--close-text="立即重启"-->
      <!--@close="freshData"-->
      <!--type="warning">-->
    <!--</el-alert>-->
    <p class="title">DNS服务器</p>
    <div class="container">
      <el-button type="primary" @click="dialogVisible1 = true" size="medium">新增</el-button>
      <el-table
        v-loading="loading"
        border
        stripe
        :data="tabledata"
        style="width: 100%;margin-top: 10px">
        <el-table-column
          prop="ip"
          label="IP">
        </el-table-column>
        <el-table-column
          prop="hostName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.option + 'DNS服务器'" placement="top-start">
              <el-button
                size="mini"
                @click="handleStart(scope.$index, scope.row)">
                {{scope.row.option}}
              </el-button>
            </el-tooltip>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="title">DNS记录</p>
    <div class="container">
      <el-tabs type="border-card">
        <el-tab-pane v-for="record in records" :label="record" :key="record">
          <p style="width: 85%; display: inline-block; margin-bottom: 20px; font-size: 18px">域名： {{recordData[record].domain}}</p>
          <!--<el-button type="primary" @click="dialogVisible2 = true" size="medium">新增记录</el-button>-->
          <el-table :data="recordData[record].nodes" border style="width: 100%">
            <el-table-column label="IP" prop="ip"></el-table-column>
            <el-table-column label="状态" prop="enable"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDNSRcordState(scope.$index, record, scope.row)">
                  {{scope.row.enable==='开启' ? '关闭' : '开启'}}
                </el-button>
                <!--<el-button-->
                  <!--size="mini"-->
                  <!--type="danger"-->
                  <!--@click="handleDeleteRecord(scope.$index, record, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      :show-close="false"
      title="新增DNS服务器"
      v-loading="loading"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="IP：">
          <el-input v-model="newIP"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="cancelClicked1" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <!--<i-dialog title="新增DNS服务器" :show="dialogVisible1"-->
              <!--@confirmClicked="confirmClicked1"-->
              <!--@cancelClicked="cancelClicked1">-->
      <!--<div class="form" v-loading="loading" >-->
        <!--<div class="label">IP： </div>-->
        <!--<input v-model="newIP"/>-->
      <!--</div>-->
    <!--</i-dialog>-->
    <!--<i-dialog title="新增DNS记录" :show="dialogVisible2"-->
              <!--@confirmClicked="confirmClicked2"-->
              <!--@cancelClicked="cancelClicked2">-->
      <!--<div class="form" v-loading="loading2" >-->
        <!--<div class="label">IP： </div>-->
        <!--<input v-model="newRecord.ip"/>-->
      <!--</div>-->
      <!--<div class="form" v-loading="loading2" >-->
        <!--<div class="label">type： </div>-->
        <!--<select style="width: 195px;background-color: #fff;height: 22px" id="recordType">-->
          <!--<option v-for="item in records" :key="item" :value="item">{{item}}</option>-->
        <!--</select>-->
      <!--</div>-->
    <!--</i-dialog>-->
  </div>
</template>

<script>
  import { getDNSHost, addDNSHost, deleteDNSHost, restartDNSHost,
    getDNSRcord, addDNSRcord, freshDNS, deleteDNSRcord, putDNSRcord } from '@/api/system/balancing'
  import iTable from './../../components/Table/index'

  export default {
    name: 'loadBalancing',
    data() {
      return {
        hasFix: false,
        labels: [
          {
            label: 'IP',
            prop: 'ip'
          }, {
            label: '名称',
            prop: 'hostName'
          }, {
            label: '状态',
            prop: 'status'
          }],
        tabledata: [],
        recordData: {
          smb: {
            domain: '',
            nodes: []
          },
          nfs: {
            domain: '',
            nodes: []
          },
          rgw: {
            domain: '',
            nodes: []
          },
          iscsi: {
            domain: '',
            nodes: []
          },
          ftp: {
            domain: '',
            nodes: []
          }
        },
        records: ['smb', 'nfs', 'rgw', 'iscsi', 'ftp'],
        checkedDNS: '',
        newIP: '',
        dialogVisible1: false,
        dialogVisible2: false,
        start: '',
        loading: false,
        loading2: false,
        newRecord: {
          ip: '',
          type: '',
          enable: true
        }
      }
    },
    components: {
      iTable
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      freshData() {
        freshDNS().then(res => {
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.fetchData()
            this.$message({
              message: 'DNS配置更新成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'DNS配置更新失败：' + res.data.message,
              type: 'error'
            })
          }
        })
      },
      fetchData() {
        this.loading = true
        getDNSHost().then(res => {
          this.loading = false
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.tabledata = res.data.data
            res.data.data.forEach((item, index) => {
              let str = item.status.split(')')[0]
              this.tabledata[index].status = str.includes('(') ? str + ')' : str
              this.tabledata[index].option = item.status.includes('running') ? '关闭' : '开启'
            })
          } else {
            this.$message({
              message: 'DNS服务器获取失败：' + res.data.message,
              type: 'error'
            })
          }
        })
        getDNSRcord().then(res => {
          if (res.data.code === 0) {
            let data = res.data.data.rcords
            data.forEach(item => {
              this.recordData[item.type].domain = item.prefix + '.' + res.data.data.domainName
              item.nodes.forEach(node => {
                node.enable = node.enable ? '开启' : '关闭'
              })
              this.recordData[item.type].nodes = item.nodes
            })
          }
        })
      },
      handleDeleteRecord(index, record, row) {
        console.log(index)
        let params = {
          ip: row.ip,
          type: record
        }
        deleteDNSRcord(params).then(res => {
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.$message({
              message: 'DNS记录删除成功',
              type: 'success'
            })
            this.hasFix = true
            this.recordData[record].nodes.splice(index, 1)
          } else {
            this.$message({
              message: 'DNS记录删除失败',
              type: 'error'
            })
          }
        })
      },
      handleDNSRcordState(index, record, row) {
        let params = {
          method: row.enable === '开启' ? 'disable' : 'enable',
          ip: row.ip,
          type: record
        }
        putDNSRcord(params).then(res => {
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.$message({
              message: 'DNS记录状态修改成功',
              type: 'success'
            })
            this.hasFix = true
            this.recordData[record].nodes[index].enable = params.method === 'enable' ? '开启' : '关闭'
          } else {
            this.$message({
              message: 'DNS记录状态修改失败',
              type: 'error'
            })
          }
        })
      },
      handleDelete(index, row) {
        this.loading = true
        deleteDNSHost(row.ip).then(res => {
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.$message({
              message: 'DNS服务器删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'DNS服务器删除失败',
              type: 'error'
            })
          }
          this.loading = false
          this.fetchData()
        })
      },
      handleStart(index, row) {
        console.log(row)
        this.loading = true
        let method = row.option === '开启' ? 'restart' : 'stop'
        restartDNSHost(row.ip, method).then(res => {
          if (res.data.code === 0) {
            // this.dnsData = res.data.data
            this.$message({
              message: 'DNS服务器' + row.option + '成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'DNS服务器' + row.option + '失败',
              type: 'error'
            })
          }
          this.loading = false
          this.fetchData()
        })
      },
      confirmClicked1() {
        this.loading = true
        addDNSHost(this.newIP).then(res => {
          if (res.data.code === 0 && res.data.data.includes('already') === false) {
            this.$message({
              message: 'DNS服务器添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'DNS服务器添加失败',
              type: 'error'
            })
          }
          this.newIP = ''
          this.dialogVisible1 = false
          this.loading = false
          this.fetchData()
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      confirmClicked2() {
        console.log(this.newRecord)
        this.newRecord.type = document.getElementById('recordType').value
        addDNSRcord(this.newRecord).then(res => {
          if (res.data.code === 0 && res.data.data.includes('already') === false) {
            // this.dnsData = res.data.data
            this.hasFix = true
            this.recordData[this.newRecord.type].nodes.push({
              ip: this.newRecord.ip,
              enable: '开启'
            })
            this.$message({
              message: 'DNS记录添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'DNS记录添加失败',
              type: 'error'
            })
          }
        })
        this.dialogVisible2 = false
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    margin-left 20px
    margin-top 20px
    font-weight bolder
    color: #333
  .container
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    margin-top 10px
    margin-left 20px
    width 90%
    min-width 500px
    background-color #fff
    padding 20px
    .button-box
      top 0
      width 5%
      display inline-block
  .form
    margin-top  10px
    margin-left 5%
  .label
    display: inline-block;
    width: 120px;
    text-align: right
</style>

