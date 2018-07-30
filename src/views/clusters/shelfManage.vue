<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增机架" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="fetchData"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
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
  import { getList, addRack, getRack, addpNode, deletepNode } from '@/api/clusters/rack'
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
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          })
        })
      },
      newRack() {
        const params = {
          name: this.name,
          location: this.location
        }
        const postdata = 'name=' + this.name + '&&' + 'location=' + this.location
        console.log(postdata)
        addRack(params).then(res => {
          console.log(res)
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
          this.$message({
            message: '配置成功！',
            type: 'success'
          })
          this.fetchData()
        })
          .catch(err => {
            console.log(err)
          })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    },
    mounted() {
      this.fetchData()
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
        display: inline-block;
        width: 120px;
        text-align: right
</style>
