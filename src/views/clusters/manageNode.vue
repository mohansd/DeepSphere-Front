<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" size="medium">新增管理节点</el-button>
    <el-button type="primary" @click="fetchData" size="medium" icon="el-icon-refresh">刷新</el-button>
    <el-button type="danger" size="medium" :disabled="isNode" @click="handleDelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @currentchange="currentchange"
             @clickEdit="EditClicked" style="margin-top: 20px;min-width: 600px"></i-table>
    <div style="font-size:18px;font-weight: 900;margin-top: 20px">模板</div>
    <div class="templatebox">
      <el-row style="margin-top: 25px;width: 600px;margin-left: 30px">
        <el-checkbox-group v-model="enabled_modules" @change="changemodule">
          <el-col :span="8" v-for="module in modulesList" :key="module" style="margin-top: 10px">
            <el-checkbox :label="module" style="color: #333;width: 120px"  border></el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <div style="margin-top: 50px;margin-left: 15%">
      </div>
    </div>

    <el-dialog
      :show-close="false"
      title="新增管理节点"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="新增管理节点..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="节点名">
          <el-input v-model="newNode.hostname"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="newNode.ip"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="配置管理节点"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="配置管理节点..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="节点名">
          <el-input v-model="currentnode.hostname"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="currentnode.ip"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="state" label="sandby" >开启</el-radio>
          <el-radio v-model="state" label="stop" >关闭</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked2" size="small">确 定</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getList, addmgrNode, getModules, updateModules, changeState, deletemgrNode } from '@/api/clusters/mgrNode'
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
        loading: false,
        isNode: true,
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
          'zabbix',
          'iostat'],
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
      handleDelete() {
        deletemgrNode(this.currentnode.ip).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '管理节点删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '管理节点删除失败:' + res.data.message,
              type: 'error'
            })
          }
        })
      },
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
      },
      confirmClicked1() {
        this.loading = true
        addmgrNode(this.newNode).then(res => {
          this.loading = false
          this.dialogVisible1 = false
          if (res.data.code !== 0) {
            this.$message({
              message: '管理节点添加失败，请确认后重试！',
              type: 'error'
            })
          } else {
            this.$message({
              message: '添加管理节点成功！',
              type: 'success'
            })
          }
          this.fetchData()
          this.newNode.hostname = ''
          this.newNode.ip = ''
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(index, row)
        this.state = row.state === 'running' ? 'sandby' : 'stop'
        this.currentnode.hostname = row.hostname
        this.currentnode.ip = row.ip
      },
      confirmClicked2() {
        console.log(this.state)
        this.loading = true
        changeState(this.currentnode.ip, this.state).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible2 = false
            this.$message({
              message: '节点配置成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '节点配置失败！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      currentchange(val) {
        if (val) {
          this.isNode = false
          this.currentnode = val
        }
      }
    },
    mounted() {
      this.fetchData()
      this.getModule()
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
        display: inline-block
        width: 120px
        text-align: right
    .templatebox
      margin-top 10px
      min-width 600px
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
