<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增管理节点" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="fetchData"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @clickEdit="EditClicked"></i-table>
    <div style="font-size:18px;font-weight: 900;margin-top: 20px">模板</div>
    <div class="templatebox">
      <el-row style="margin-top: 25px;width: 600px;margin-left: 30px">
        <el-checkbox-group v-model="enabled_modules" @change="changemodule">
          <el-col :span="8" v-for="module in modulesList" :key="module" style="margin-top: 10px">
            <el-checkbox :label="module" style="color: #333" ></el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <div style="margin-top: 50px;margin-left: 15%">
      </div>
    </div>
    <i-dialog title="新增管理节点" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">节点名： </div>
        <input v-model="newNode.hostname" placeholder="输入节点名"/>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <input v-model="newNode.ip" placeholder="输入IP"/>
      </div>
    </i-dialog>
    <i-dialog title="配置管理节点" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">节点名： </div>
        <input v-model="currentnode.hostname"/>
        <el-button type="danger" size="mini">删除</el-button>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <input v-model="currentnode.ip"/>
      </div>
      <div class="form"  style="text-align: center">
        <el-radio v-model="state" label="sandby" >开启</el-radio>
        <el-radio v-model="state" label="stop" >关闭</el-radio>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, addmgrNode, getModules, updateModules, changeState } from '@/api/clusters/mgrNode'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  import lodash from 'lodash'
  export default {
    name: 'manageNode',
    components: {
      iTable,
      iButton,
      lodash
    },
    data() {
      return {
        currentnode: {
          hostname: '',
          ip: ''
        },
        state: 'sandby',
        ip: '192.168.3.12',
        enabled_modules: [],
        modulesList: ['balancer',
          'dashboard',
          'prometheus',
          'restful',
          'status',
          'influx',
          'localpool',
          'selftest',
          'zabbix'],
        newNode: {
          hostname: '',
          ip: ''
        },
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        labels: [
          {
            label: '节点名',
            prop: 'hostname'
          }, {
            label: 'IP',
            prop: 'ip'
          }, {
            label: '状态',
            prop: 'state'
          }]
      }
    },
    methods: {
      changemodule(index) {
        console.log(index)
        console.log(this.modulesList)
        let diasabled = lodash.difference(this.modulesList, index)
        diasabled.forEach(item => {
          updateModules(this.ip, item, 'disable').then(res => {
          })
        })
        this.enabled_modules.forEach(item => {
          updateModules(this.ip, item, 'enable').then(res => {
            this.$message({
              message: '模块修改成功！',
              type: 'success'
            })
          })
        })
      },
      getModule() {
        getModules(this.ip).then(res => {
          this.enabled_modules = res.data.data.enabled_modules
        })
      },
      rowClicked(row) {
        this.ip = row.ip
        this.getModule()
      },
      fetchData() {
        getList().then(response => {
          const data = response.data.data
          this.tabledata = data
          this.tabledata.forEach(item => {
            if (item.state === 'running') {
              this.ip = item.ip
            }
          })
        })
          .catch(err => {
            console.log(err)
          })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        addmgrNode(this.newNode).then(res => {
          this.$message({
            message: '添加管理节点成功！',
            type: 'success'
          })
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(index, row)
        this.state = row.state
        this.currentnode.hostname = row.hostname
        this.currentnode.ip = row.ip
      },
      confirmClicked2() {
        console.log(this.state)
        changeState(this.currentnode.ip, this.state).then(res => {
          this.$message({
            message: '节点配置成功！',
            type: 'success'
          })
        })
        this.dialogVisible2 = false
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    },
    mounted() {
      this.fetchData()
      this.getModule()
    }
  }
</script>

<style scoped lang="stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
    .templatebox
      margin-top 10px
      height:300px
      width: 90%
      border: 0.5px solid rgba(190, 190, 190, 0.5)
      background-color: #fff
      .label
        display inline-block
        height 30px
        line-height 30px
        background-color #001528
        color: #fff
        padding-left 10px
        padding-right 10px
        border-radius 5px
</style>
