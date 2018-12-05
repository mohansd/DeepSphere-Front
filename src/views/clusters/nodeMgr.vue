<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" size="medium">新增节点</el-button>
    <el-button type="danger" size="medium" :disabled="isNode" @click="handleDelete" icon="el-icon-close">删除节点</el-button>
    <el-button type="danger" size="medium" @click="dialogVisible2 = true" icon="el-icon-close">删除集群</el-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @currentchange="currentchange"
             style="margin-top: 20px;margin-bottom: 20px"
             :showedit="showEdit"></i-table>
    <el-dialog
      :show-close="false"
      title="新增节点"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini">
        <el-form-item label="节点IP">
          <el-input v-model="newNode.ip"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="newNode.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newNode.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
      :show-close="false"
      title="删除集群"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <p>确定删除集群: {{deletePool}}?</p>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDeleteCluster" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getNodeList, addNode, deleteNode, deleteCluster } from '@/api/clusters/pNode'
  import iTable from './../../components/Table/index'
  export default {
    name: 'shelfManage',
    components: {
      iTable
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
      handleDeleteCluster() {
        deleteCluster().then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '集群删除成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '集群删除失败！',
              type: 'error'
            })
          }
        })
      },
      fetchData() {
        this.tabledata = []
        getNodeList().then(res => {
          let data = res.data.data
          data.forEach(item => {
            this.tabledata.push({
              hostname: item.hostname,
              ip: item.ip,
              isData: item.isData ? '是' : '否',
              isMDS: item.isMDS ? '是' : '否',
              isMgr: item.isMgr ? '是' : '否',
              isMon: item.isMon ? '是' : '否',
              isRgw: item.isRgw ? '是' : '否',
              osds: this.translateArr(item.osds)
            })
          })
        })
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
        if (val) {
          this.currentNode.ip = val.ip
          this.isNode = false
        }
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        addNode(this.newNode).then(res => {
          if (res.data.code !== 0) {
            this.$message({
              message: '新增节点失败：' + res.data.message,
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
