<template>
  <div class="table-container">
    <el-button class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" type="primary">新增用户组</el-button>
    <el-button type="primary" @click="fetchData" icon="el-icon-refresh">刷新</el-button>
    <el-button type="danger" icon="el-icon-close" :disabled="hasGroup" @click="handleDelete">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             edit="配置"
             style="margin-bottom: 20px; margin-top: 20px"
             @currentchange="handleCurrentChange"
             @clickEdit="EditClicked">
    </i-table>

    <el-dialog
      :show-close="false"
      title="新增用户组"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="新增用户组..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="名称">
          <el-input v-model="newGroup.groupName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <i-dialog title="修改用户组成员" :show="dialogVisible3"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
          <div style="max-height: 300px;overflow:auto">
            <el-tree
              :data="userList"
              show-checkbox
              node-key="id"
              ref="groupList"
              :default-checked-keys="checkedUser"
              @check="getCheckedKeys"
              :props="defaultProps">
            </el-tree>
          </div>
    </i-dialog>

    <el-dialog
      :show-close="false"
      title="修改用户组成员"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <div style="max-height: 300px;overflow:auto">
        <el-tree
          v-loading="loading"
          element-loading-text="修改用户组成员..."
          element-loading-spinner="el-icon-loading"
          :data="userList"
          show-checkbox
          node-key="id"
          ref="groupList"
          :default-checked-keys="checkedUser"
          @check="getCheckedKeys"
          :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked2" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getGroupList, getUserList, getGroupInfo, setGroup, addGroup, deleteGroup } from '../../../api/file/user'
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
        loading: false,
        hasGroup: true,
        newGroup: {
          groupName: ''
        },
        currentGroup: {
          groupName: '',
          users: []
        },
        userList: [],
        checkedUser: [],
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
        dialogVisible3: false,
        tabledata: [],
        labels: [
          {
            label: '用户组',
            prop: 'groupName'
          }, {
            label: '成员',
            prop: 'users'
          }]
      }
    },
    methods: {
      fetchData() {
        this.tabledata = []
        getUserList().then(res => {
          if (res.data.data && res.data.data.length > 0) {
            this.userList = res.data.data.map((item, index) => {
              return {
                id: index + 1,
                label: item.userName
              }
            })
          }
        })
        getGroupList().then(res => {
          if (res.data.code === 0) {
            if (res.data.data && res.data.data.length > 0) {
              let groupList = res.data.data
              groupList.forEach(item => {
                let userStr = ''
                if (item.isSystem === false) {
                  if (item.users) {
                    item.users.forEach((user, index) => {
                      if (index === 0) {
                        userStr = user
                      } else {
                        userStr = userStr + ', ' + user
                      }
                    })
                  }
                  this.tabledata.push({
                    groupName: item.groupName,
                    users: userStr
                  })
                }
              })
            }
          }
        })
      },
      getCheckedKeys(value1, value2) {
        // this.newuser.groups = []
        this.currentGroup.users = []
        value2.checkedNodes.forEach(item => {
          // this.newGroup.groups.push(item.label)
          this.currentGroup.users.push(item.label)
        })
      },
      confirmClicked1() {
        this.loading = true
        addGroup(this.newGroup).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible1 = false
            this.$message({
              message: '用户组添加成功！',
              type: 'success'
            })
            this.newuser = {
              userName: '',
              passWD: ''
            }
          } else {
            this.$message({
              message: '用户组添加失败！',
              type: 'error'
            })
          }
          this.fetchData()
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        this.currentGroup.groupName = row.groupName
        this.checkedUser = []
        this.$refs.groupList.setCheckedKeys([])
        getGroupInfo(row.groupName).then(res => {
          if (res.data.code === 0) {
            if (res.data.data.users && res.data.data.users.length > 0) {
              let users = res.data.data.users
              users.forEach((user, index) => {
                this.userList.forEach(item => {
                  if (user === item.label) {
                    this.checkedUser.push(item.id)
                    this.$refs.groupList.setCheckedKeys(this.checkedUser)
                  }
                })
              })
            }
          }
        })
      },
      confirmClicked2() {
        this.loading = true
        this.currentGroup.users = this.$refs.groupList.getCheckedNodes().map(item => {
          return item.label
        })
        setGroup(this.currentGroup).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible2 = false
            this.$message({
              message: '用户组成员修改成功！',
              type: 'success'
            })
            this.newuser = {
              userName: '',
              passWD: ''
            }
            this.fetchData()
          } else {
            this.$message({
              message: '用户组成员修改失败！',
              type: 'error'
            })
            this.fetchData()
          }
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleDelete() {
        deleteGroup(this.currentGroup).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '用户组删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '用户组删除失败！',
              type: 'error'
            })
          }
        })
      },
      handleCurrentChange(val) {
        if (val) {
          // this.current.name = val.groupName
          this.data2[0].children = []
          this.hasGroup = false
        } else {
          this.hasGroup = true
        }
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .table-container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    margin-bottom 50px
    width 80%
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
</style>
