<template>
  <div class="table-container">
    <el-button class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" type="primary">新增用户</el-button>
    <el-button type="primary" @click.native="refresh" icon="el-icon-refresh">刷新</el-button>
    <el-button type="danger" @click="deleteUser" icon="el-icon-close" :disabled="hasUser">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置"
             @currentchange="currentchange"
             style="margin-top: 20px"
             @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增用户" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
          <div class="form">
            <div class="label">名称： </div>
            <input v-model="newuser.userName"/>
          </div>
          <div class="form">
            <div class="label">密码： </div>
            <input v-model="newuser.passWD"/>
          </div>
    </i-dialog>
    <i-dialog title="修改用户组" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
        <div style="max-height: 300px;overflow:auto">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :default-checked-keys="checkeduser"
            @check="getCheckedKeys">
          </el-tree>
        </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getUserList, addUser, deleteUser, getGroupList, setUser } from '@/api/file/user'
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
        hasUser: true,
        currentKey: null,
        checkeduser: [],
        shells: [],
        activeName: 'first',
        data: [],
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
          userName: '',
          passWD: ''
        },
        currentuser: {
          userName: ''
        },
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        tabledata: [],
        labels: [
          {
            label: '用户',
            prop: 'userName'
          }, {
            label: '用户组',
            prop: 'groups'
          }]
      }
    },
    methods: {
      refresh() {
        this.fetchData()
      },
      deleteUser() {
        // console.log(this.currentuser)
        deleteUser(this.currentuser).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '用户删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '用户删除失败！',
              type: 'error'
            })
          }
        })
      },
      getCheckedKeys(value1, value2) {
        this.newuser.groups = []
        this.currentuser.groups = []
        value2.checkedNodes.forEach(item => {
          this.newuser.groups.push(item.label)
          this.currentuser.groups.push(item.label)
        })
      },
      selected(value) {
        this.newuser.shell = value
      },
      fetchData() {
        this.tabledata = []
        this.data = []
        getUserList().then(res => {
          console.log(res)
          res.data.data.forEach(user => {
            if (!user.isSystem) {
              let group = ''
              if (user.groups && user.groups.length > 0) {
                user.groups.forEach((item, index) => {
                  if (index === 0) {
                    group = item
                  } else {
                    group = item + ', ' + group
                  }
                })
              }
              this.tabledata.push({
                group: user.groups,
                userName: user.userName,
                groups: group
              })
            }
          })
        })
        getGroupList().then(res => {
          console.log(res)
          res.data.data.forEach((group, index) => {
            if (group.groupName && group.groupName !== '') {
              this.data.push({
                label: group.groupName,
                id: index
              })
            }
          })
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        addUser(this.newuser).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '用户添加成功！',
              type: 'success'
            })
            this.newuser = {
              userName: '',
              passWD: ''
            }
            this.fetchData()
          } else {
            this.$message({
              message: '用户添加失败！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        console.log(index, row)
        this.checkeduser = []
        this.data.forEach(group => {
          row.group.forEach(item => {
            if (item === group.label) {
              this.checkeduser.push(group.id)
              this.$refs.tree.setCheckedKeys(this.checkeduser)
            }
          })
        })
        this.dialogVisible2 = true
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        let params = {
          userName: this.currentuser.userName,
          groups: []
        }
        params.groups = this.$refs.tree.getCheckedNodes().map(item => {
          return item.label
        })
        console.log(params)
        setUser(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '用户组修改成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '用户组修改失败！',
              type: 'error'
            })
            this.fetchData()
          }
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
      },
      currentchange(val) {
        if (val) {
          console.log(val)
          this.hasUser = false
          this.currentuser.userName = val.userName
        } else {
          this.hasUser = true
        }
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
    margin-bottom 50px
    width 80%
    height: 800px
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
    table
      width: 100%
      max-height 200px
      overflow auto
      th
      td
        border-top 1px solid rgba(170, 170, 170, 0.5)
        height: 30px
        line-height 30px
        text-align center
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
  .el-input__inner
    height: 30px
</style>
