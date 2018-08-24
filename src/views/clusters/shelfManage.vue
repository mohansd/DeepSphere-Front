<template>
  <div class="container">
    <el-button type="primary" size="medium" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true">新增机架</el-button>
    <el-button type="primary" icon="el-icon-refresh" @click.native="fetchData" size="medium">刷新</el-button>
    <el-button type="danger" size="medium" :disabled="isRack" @click.native="handledelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @currentchange="handlecurrentchange"
             style="margin-top: 20px"
             @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增机架" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">机架名： </div>
        <input v-model="name" placeholder="输入机架名"/>
      </div>
      <div class="form">
        <div class="label">机房： </div>
        <input v-model="location" placeholder="输入机房名"/>
      </div>
    </i-dialog>
    <i-dialog title="配置机架" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">机架： </div>
        <input v-model="editRack.name" />
      </div>
      <div class="form">
        <div class="label">机房： </div>
        <input v-model="editRack.location"/>
      </div>
      <div class="form">
        <div class="label" style="vertical-align: top;">删除节点： </div>
        <div style="display: inline-block;height:150px;width:195px;overflow:auto;border: 1px solid rgb(169, 169, 169)">
          <el-checkbox-group v-model="checkedNode" @change="handleCheckedNodeChange">
            <div v-for="item in pNode" :key="item._id">
              <el-checkbox  :label="item.hostname" >{{item.hostname}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <el-button size="mini" type="primary" @click="deletepNode" style="vertical-align: top;">删除</el-button>
      </div>
      <div class="form">
        <div class="label">增加节点： </div>
        <input v-model="nodeName" placeholder="输入节点名"/>
        <div class="label" ></div>
        <input v-model="nodeIp" placeholder="输入节点IP" style="margin-top: 5px"/>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, addRack, getRack, addpNode, deletepNode, deleteRack } from '@/api/clusters/rack'
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
        checkedNode: [],
        isRack: true,
        nodeName: '',
        nodeIp: '',
        name: '',
        location: '',
        pNode: [],
        edit: '编辑',
        editRack: {
          name: '',
          location: ''
        },
        currentrack: '',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        labels: [
          {
            label: '机架',
            prop: 'name'
          }, {
            label: '机房',
            prop: 'location'
          }, {
            label: '服务器',
            prop: 'pnode'
          }]
      }
    },
    methods: {
      handleCheckedNodeChange(val) {
        console.log(this.checkedNode)
      },
      deletepNode() {
        this.checkedNode.forEach(item => {
          const pnode = {
            pNodeName: item
          }
          deletepNode(this.editRack.name, pnode).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.fetchData()
              this.dialogVisible2 = false
            } else {
              this.$message({
                message: '出现错误，请重试！',
                type: 'error'
              })
            }
          })
        })
      },
      newRack() {
        const params = {
          name: this.name,
          location: this.location
        }
        addRack(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增机架成功！',
              type: 'success'
            })
            this.name = ''
            this.location = ''
            this.fetchData()
          } else {
            this.$message({
              message: '出现错误，请重试！',
              type: 'error'
            })
          }
        })
      },
      fetchData() {
        getList().then(response => {
          const data = response.data.data
          this.tabledata = []
          data.forEach((item, index) => {
            let pnode = ''
            item.pnode.forEach(item => {
              pnode = pnode + ' ' + item.hostname
            })
            this.tabledata.push({ name: item.name, location: item.location, pnode: pnode })
          })
        })
          .catch(err => {
            console.log(err)
          })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        this.newRack()
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        this.editRack.name = row.name
        this.editRack.location = row.location
        getRack(row.name).then(res => {
          this.pNode = res.data.data[index].pnode
        })
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        const params = {
          pNodeName: this.nodeName
        }
        addpNode(this.editRack.name, params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增节点成功！',
              type: 'success'
            })
            this.fetchData()
            this.nodeName = ''
            this.nodeIp = ''
          } else {
            this.$message({
              message: '新增节点出错，请确认后重试！',
              type: 'error'
            })
            this.nodeName = ''
            this.nodeIp = ''
          }
        })
          .catch(err => {
            console.log(err)
          })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handledelete() {
        if (this.currentrack !== '') {
          deleteRack(this.currentrack).then(res => {
            this.$message({
              message: '机架删除成功！',
              type: 'success'
            })
            this.currentrack = ''
            this.fetchData()
          })
        } else {
          this.$message({
            message: '请选择需要删除的机架！',
            type: 'error'
          })
        }
      },
      handlecurrentchange(val) {
        if (val) {
          console.log(val)
          this.currentrack = val.name
          this.isRack = false
        }
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
