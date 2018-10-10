<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增用户组" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="fetchData"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels"
             edit="配置"
             style="margin-bottom: 20px"
             @currentchange="handleCurrentChange"
             @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增用户组" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
          <div class="form">
            <div class="label">名称： </div>
            <input v-model="newGroup.groupName"/>
          </div>
    </i-dialog>
    <i-dialog title="修改用户组成员" :show="dialogVisible2"
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
  </div>
</template>

<script>
  import { getGroupList, getUserList, getGroupInfo, setGroup, addGroup } from '../../../api/file/user'
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
          console.log(this.userList)
        })
        getGroupList().then(res => {
          if (res.data.code === 0) {
            if (res.data.data && res.data.data.length > 0) {
              let groupList = res.data.data
              console.log(groupList)
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
        console.log(this.currentGroup)
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        console.log(this.newGroup)
        addGroup(this.newGroup).then(res => {
          if (res.data.code === 0) {
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
        console.log(row)
        this.currentGroup.groupName = row.groupName
        this.checkedUser = []
        this.$refs.groupList.setCheckedKeys([])
        getGroupInfo(row.groupName).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            if (res.data.data.users && res.data.data.users.length > 0) {
              let users = res.data.data.users
              users.forEach((user, index) => {
                this.userList.forEach(item => {
                  if (user === item.label) {
                    this.checkedUser.push(item.id)
                    console.log(this.checkedUser)
                    this.$refs.groupList.setCheckedKeys(this.checkedUser)
                  }
                })
              })
            }
          }
        })
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        this.currentGroup.users = this.$refs.groupList.getCheckedNodes().map(item => {
          return item.label
        })
        setGroup(this.currentGroup).then(res => {
          if (res.data.code === 0) {
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
      handleCurrentChange(val) {
        if (val) {
          // console.log(val)
          // this.current.name = val.groupName
          this.data2[0].children = []
        }
      }
    },
    mounted() {
      this.fetchData()
      console.log(1)
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
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
</style>
