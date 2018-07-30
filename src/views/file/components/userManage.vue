<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增用户" @click.native="dialogVisible1=true"></i-button>
    <i-button icon="el-icon-view" text="权限" @click.native="dialogVisible3=true"></i-button>
    <i-button type="refresh" @click.native="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增用户" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <el-tabs class="user-tabs" v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: -20px">
        <el-tab-pane label="常规" name="first">
          <div class="form">
            <div class="label">名称： </div>
            <input v-model="newuser.name"/>
          </div>
          <div class="form">
            <div class="label">注释： </div>
            <input v-model="newuser.comment"/>
          </div>
          <div class="form">
            <div class="label">Email： </div>
            <input v-model="newuser.email"/>
          </div>
          <div class="form">
            <div class="label">密码： </div>
            <input v-model="newuser.password"/>
          </div>
          <div class="form">
            <div class="label">确认密码： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">Shell： </div>
            <el-select v-model="shell" @change="selected">
              <el-option v-for="item in shells" :key="item" :value="item" class="my-selset"
                         :label="item"></el-option>
            </el-select>
          </div>
          <div class="form">
            <div class="label">修改账户： </div>
            <el-switch
              v-model="newuser.disallowusermod"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <span>不允许用户修改自己的账户</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户组" name="second" >
          <div style="max-height: 300px;overflow:auto">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :props="defaultProps"
            @check="getCheckedKeys">
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
    </i-dialog>
    <i-dialog title="修改用户信息" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <el-tabs class="user-tabs" v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: -20px">
      <el-tab-pane label="常规" name="first">
        <div class="form">
          <div class="label">名称： </div>
          <input v-model="thisuser.name"/>
        </div>
        <div class="form">
          <div class="label">注释： </div>
          <input v-model="thisuser.comment"/>
        </div>
        <div class="form">
          <div class="label">Email： </div>
          <input v-model="thisuser.email"/>
        </div>
        <div class="form">
          <div class="label">密码： </div>
          <input v-model="thisuser.password"/>
        </div>
        <div class="form">
          <div class="label">确认密码： </div>
          <input />
        </div>
        <div class="form">
          <div class="label">Shell： </div>
          <el-select v-model="shell" @change="selected">
            <el-option v-for="item in shells" :key="item" :value="item" class="my-selset"
                       :label="item"></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="label">修改账户： </div>
          <el-switch
            v-model="thisuser.disallowusermod"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>不允许用户修改自己的账户</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户组" name="second" >
        <div style="max-height: 300px;overflow:auto">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check="getCheckedKeys">
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
    </i-dialog>
    <i-dialog title="共享文件夹权限" :show="dialogVisible3"
              @confirmClicked="confirmClicked3"
              @cancelClicked="cancelClicked3">
      <table style="margin-top: -20px">
        <tr>
          <th width="30%">类型</th>
          <th width="30%">名称</th>
          <th>读/写</th>
          <th>只读</th>
          <th>禁止读写</th>
        </tr>
      </table>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, setUser, getShells, getAllGroup } from '@/api/file/user'
  import iTable from './../../../components/Table/index'
  import iButton from './../../../components/Button/iButton'
  export default {
    name: 'userManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        shells: [],
        activeName: 'first',
        data: [{
          id: 1,
          label: '系统账户',
          children: []
        }],
        data2: [{
          id: 1,
          label: '系统账户',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        shell: '',
        newuser: {
          name: '',
          comment: '',
          email: '',
          password: '',
          shell: '',
          disallowusermod: false,
          groups: [],
          sshpubkeys: []
        },
        thisuser: {
          name: '',
          comment: '',
          email: '',
          password: '',
          shell: '',
          disallowusermod: false,
          groups: [],
          sshpubkeys: []
        },
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        tabledata: [],
        labels: [
          {
            label: '名称',
            prop: 'name'
          }, {
            label: 'Email',
            prop: 'email'
          }, {
            label: '注释',
            prop: 'comment'
          }]
      }
    },
    methods: {
      refresh() {
        this.fetchData()
      },
      getCheckedKeys(value1, value2) {
        this.newuser.groups = []
        value2.checkedNodes.forEach(item => {
          this.newuser.groups.push(item.label)
        })
      },
      selected(value) {
        this.newuser.shell = value
      },
      fetchData() {
        this.tabledata = []
        getList().then(res => {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            this.tabledata.push({
              name: item.name,
              email: item.email,
              comment: item.comment
            })
          })
        })
        getShells().then(res => {
          this.shells = res.data
        })
        getAllGroup().then(res => {
          let data = res.data
          console.log(res.data)
          this.data[0].children = []
          this.data2[0].children = []
          data.forEach((item, index) => {
            this.data[0].children.push(
              {
                id: index,
                label: item.name
              }
            )
            this.data2[0].children.push(
              {
                id: index,
                label: item.name
              }
            )
          })
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        console.log(this.newuser)
        setUser(this.newuser).then(res => {
          this.$message({
            message: '新增用户成功！',
            type: 'success'
          })
          this.fetchData()
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(index, row)
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        setUser(this.thisuser).then(res => {
          this.$message({
            message: '修改用户成功！',
            type: 'success'
          })
          this.fetchData()
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      confirmClicked3() {
        this.dialogVisible3 = false
      },
      cancelClicked3() {
        this.dialogVisible3 = false
      },
      handleClick(tab, event) {
        console.log(tab, event)
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

<style lang="stylus">
  .user-tabs.el-tabs--card>.el-tabs__header
    background-color #BDDBF5
    height: 35px
    padding-top 10px
    padding-left 5px
  .user-tabs.el-tabs--card>.el-tabs__header .el-tabs__item
    background-color #1262aa
    height 25px
    line-height 25px
    color #fff
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  .user-tabs.el-tabs--card>.el-tabs__header .el-tabs__item.is-active
    background-color #f3f3f3
    color #333
</style>

<style lang="stylus">
  .el-input__inner
    height: 30px
</style>
