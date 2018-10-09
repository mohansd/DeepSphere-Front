<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true" size="medium">新增节点</el-button>
    <el-button type="danger" size="medium" :disabled="isNode" @click.native="handleDelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @currentchange="currentchange"
             style="margin-top: 20px"
             :showedit="showEdit"></i-table>
    <i-dialog title="新增节点" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">节点IP： </div>
        <input v-model="newNode.ip"/>
      </div>
      <div class="form">
        <div class="label">用户名： </div>
        <input v-model="newNode.username"/>
      </div>
      <div class="form">
        <div class="label">密码： </div>
        <input v-model="newNode.password"/>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, addNode, deleteNode } from '@/api/clusters/pNode'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'shelfManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        showEdit: false,
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        isNode: true,
        newNode: {
          ip: '',
          username: '',
          password: ''
        },
        currentNode: {
          ip: ''
        },
        tabledata: [],
        labels: [
          {
            label: '节点名',
            prop: 'hostname'
          }, {
            label: 'IP',
            prop: 'ip'
          }, {
            label: '是否数据节点',
            prop: 'isData'
          }, {
            label: 'MDS',
            prop: 'isMDS'
          }, {
            label: 'Mgr',
            prop: 'isMgr'
          }, {
            label: 'Mon',
            prop: 'isMon'
          }, {
            label: 'Rgw',
            prop: 'isRgw'
          }, {
            label: 'OSDS',
            prop: 'osds'
          }]
      }
    },
    methods: {
      fetchData() {
        this.tabledata = []
        getList().then(res => {
          let data = res.data.data
          console.log(data)
          data.forEach(item => {
            this.tabledata.push({
              hostname: item.hostname,
              ip: item.ip,
              isData: this.translateBool(item.isData),
              isMDS: this.translateBool(item.isMDS),
              isMgr: this.translateBool(item.isMgr),
              isMon: this.translateBool(item.isMon),
              isRgw: this.translateBool(item.isRgw),
              osds: this.translateArr(item.osds)
            })
          })
        })
      },
      translateBool(val) {
        if (val === true) {
          return '是'
        } else if (val === false) {
          return '否'
        }
      },
      translateArr(val) {
        let str = ''
        val.forEach((item, index) => {
          if (index === 0) {
            str = item
          } else {
            str = str + ', ' + item
          }
        })
        return str
      },
      handleDelete() {
        deleteNode(this.currentNode.ip).then(res => {
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
      currentchange(val) {
        console.log(val)
        this.currentNode.ip = val.ip
        this.isNode = false
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        addNode(this.newNode).then(res => {
          if (res.data.code !== 0) {
            this.$message({
              message: '节点信息错误！',
              type: 'error'
            })
          } else {
            this.$message({
              message: '新增节点成功！',
              type: 'success'
            })
            this.fetchData()
            this.newNode.ip = ''
            this.newNode.username = ''
            this.newNode.password = ''
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      }
    },
    mounted() {
      this.fetchData()
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
