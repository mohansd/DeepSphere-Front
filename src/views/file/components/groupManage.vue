<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增用户组" @click.native="dialogVisible1=true"></i-button>
    <i-button icon="el-icon-view" text="权限" @click.native="dialogVisible2=true"></i-button>
    <i-button type="refresh" @click.native="fetchData"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels"
             edit="配置"
             @currentchange="handleCurrentChange"
             @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增用户组" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <el-tabs class="user-tabs" v-model="activeName" @tab-click="handleClick"
               type="card" style="margin-top: -20px">
        <el-tab-pane label="常规" name="first">
          <div class="form">
            <div class="label">名称： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">注释： </div>
            <input />
          </div>
        </el-tab-pane>
        <el-tab-pane label="成员" name="second">
          <el-tree
            :data="data1"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </i-dialog>
    <i-dialog title="修改用户组信息" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <el-tabs class="user-tabs" v-model="activeName" @tab-click="handleClick"
               type="card" style="margin-top: -20px">
        <el-tab-pane label="常规" name="first">
          <div class="form">
            <div class="label">名称： </div>
            <input v-model="current.name"/>
          </div>
          <div class="form">
            <div class="label">注释： </div>
            <textarea style="height: 150px;resize: none" v-model="current.comment"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成员" name="second">
          <div style="max-height: 300px;overflow:auto">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps">
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
    </i-dialog>
  </div>
</template>

<script>
  import { getGroupList, getGroup, getAllUsers } from '../../../api/file/user'
import iTable from './../../../components/Table/index'
  import iButton from './../../../components/Button/iButton'
  export default {
    name: 'groupManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        current: {
          name: '',
          comment: '',
          members: []
        },
        activeName: 'first',
        data1: [{
          id: 1,
          label: '名称',
          children: []
        }],
        data2: [{
          id: 1,
          label: '名称',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [
          {
            name: 'gushenxing',
            notes: '',
            member: 'mh'
          }
        ],
        labels: [
          {
            label: '名称',
            prop: 'name'
          }, {
            label: '注释',
            prop: 'comment'
          }, {
            label: '成员',
            prop: 'member'
          }]
      }
    },
    methods: {
      fetchData() {
        getGroupList().then(res => {
          this.tabledata = []
          let data = res.data.data
          data.forEach((item, index) => {
            this.tabledata.push(item)
          })
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
      },
      confirmClicked2() {
        this.dialogVisible2 = false
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleCurrentChange(val) {
        this.current.name = val.name
        this.data2[0].children = []
        getAllUsers().then(res => {
          console.log(this.data2[0].children)
          res.data.forEach((item, index) => {
            this.data2[0].children.push({
              id: index,
              label: item.name
            })
          })
        })
        getGroup(this.current.name).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus">
  .table-container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    width 80%
    height: 800px
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
</style>
