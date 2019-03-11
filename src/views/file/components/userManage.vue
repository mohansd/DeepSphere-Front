<template>
  <div class="table-container">
    <el-button class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" type="primary">新增用户</el-button>
    <el-button type="primary" @click.native="refresh" icon="el-icon-refresh">刷新</el-button>
    <el-button type="danger" @click="deleteUser" icon="el-icon-close" :disabled="hasUser">删除</el-button>
    <!--<i-table :tabledata="tabledata" :labels="labels" edit="配置"-->
             <!--@currentchange="currentchange"-->
             <!--style="margin-top: 20px"-->
             <!--@clickEdit="EditClicked">-->
    <!--</i-table>-->

    <el-table
      v-loading="loading"
      style="margin-top: 20px"
      :data="tabledata"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe>
      <el-table-column
        label="用户"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="用户组"
        prop="groups">
      </el-table-column>
      <el-table-column
        label="编辑"
        width="180">
        <template slot-scope="scope">
          <el-button @click="EditClicked(scope.$index, scope.row)" size="small" type="primary">配置</el-button>
          <el-button size="small" @click="dialogVisible3 = true">配额</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      :show-close="false"
      title="新增用户"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="新增用户..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="名称">
          <el-input v-model="newuser.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newuser.passWD"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="修改用户组"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <div style="max-height: 300px;overflow:auto">
        <el-tree
          v-loading="loading"
          element-loading-text="修改用户组..."
          element-loading-spinner="el-icon-loading"
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="defaultProps"
          :default-checked-keys="checkeduser"
          @check="getCheckedKeys">
        </el-tree>
      </div>
      <div slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked2" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="配额管理"
      :visible.sync="dialogVisible3"
      width="400px"
      center>
      <el-form label-width="100px" size="mini"
               v-model="userQuota"
               v-loading="loading"
               element-loading-text="配置用户配额..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="用户名">
          <span>{{userQuota.userName}}</span>
        </el-form-item>
        <el-form-item label="容量配额">
          <el-input v-model="userQuota.quotaBytes" type="number"></el-input>
        </el-form-item>
        <el-form-item label="文件数配额">
          <el-input v-model="userQuota.quotaFiles" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible3 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked3" size="small">确 定</el-button>
          </span>
    </el-dialog>


  </div>
</template>

<script>
  import { getUserList, addUser, deleteUser, getGroupList, setUser, setUserQuota } from '@/api/file/user'
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
        userQuota: {
          userName: '',
          quotaBytes: 0,
          quotaFiles: 0
        },
        loading: false,
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
        this.loading = true
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
                groups: group,
                quotaBytes: user.quotaBytes,
                quotaFiles: user.quotaFiles
              })
            }
          })
          this.loading = false
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
        this.loading = true
        addUser(this.newuser).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible1 = false
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
              message: '用户添加失败:' + res.data.message,
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
        this.dialogVisible2 = true
        this.data.forEach(group => {
          row.group.forEach(item => {
            if (item === group.label) {
              this.checkeduser.push(group.id)
              console.log(this.$refs.tree)
              if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys(this.checkeduser)
              }
            }
          })
        })
        this.dialogVisible2 = true
      },
      confirmClicked2() {
        this.loading = true
        let params = {
          userName: this.currentuser.userName,
          groups: []
        }
        params.groups = this.$refs.tree.getCheckedNodes().map(item => {
          return item.label
        })
        setUser(params).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible2 = false
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
        this.userQuota.quotaFiles = parseInt(this.userQuota.quotaFiles)
        this.userQuota.quotaBytes = parseInt(this.userQuota.quotaBytes)
        console.log(this.userQuota)
        setUserQuota(this.userQuota).then(res => {
          if (res.data.code === 0) {
            this.$message.success('用户配额设置成功')
            console.log(res)
          } else {
            this.$message.error('用户配额设置失败')
          }
        })
      },
      cancelClicked3() {
        this.dialogVisible3 = false
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleCurrentChange(val) {
        if (val) {
          console.log(val)
          this.hasUser = false
          this.currentuser.userName = val.userName
          this.userQuota = {
            userName: val.userName,
            quotaBytes: val.quotaBytes ? val.quotaBytes : 0,
            quotaFiles: val.quotaFiles ? val.quotaFiles : 0
          }
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
