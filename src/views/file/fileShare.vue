<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true" size="medium">新增共享文件夹</el-button>
    <el-button type="danger" size="medium" :disabled="isShare" @click.native="handleDelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             @currentchange="currentchange"
             style="margin-top: 20px"
             edit="配置" @clickEdit="EditClicked">
    </i-table>

    <el-dialog
      :show-close="false"
      title="新增共享文件夹"
      :visible.sync="dialogVisible1"
      width="450px"
      center>
      <el-form ref="form" label-width="100px" size="mini"
               v-loading="loading"
               element-loading-text="新增共享文件夹..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="名称">
          <el-input v-model="newShare.directory"></el-input>
        </el-form-item>
        <el-form-item label="浏览器中访问">
          <el-switch v-model="isBrowseable"></el-switch>
          <span>{{showBrowseable}}</span>
        </el-form-item>
        <el-form-item label="匿名访问">
          <el-switch v-model="isPublic"></el-switch>
          <span>{{showPublic}}</span>
        </el-form-item>
        <el-form-item label="资源可用">
          <el-switch v-model="isAvailable"></el-switch>
          <span>{{showAvailable}}</span>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="newShare.comment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="配置共享文件夹"
      :visible.sync="dialogVisible2"
      width="450px"
      center>
      <el-tabs v-model="activeName" type="card" style="margin-top: -20px;margin-left: -20px">
        <el-tab-pane label="文件夹信息" name="first">
      <el-form ref="form" label-width="100px" size="mini"
               v-loading="loading"
               element-loading-text="配置共享文件夹..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="名称">
          <el-input v-model="currentShare.directory"></el-input>
        </el-form-item>
        <el-form-item label="浏览器中访问">
          <el-switch v-model="currentBrowseable"></el-switch>
          <span>{{showCurrentBrowseable}}</span>
        </el-form-item>
        <el-form-item label="匿名访问">
          <el-switch v-model="currentPublic"></el-switch>
          <span>{{showCurrentPublic}}</span>
        </el-form-item>
        <el-form-item label="资源可用">
          <el-switch v-model="currentAvailable"></el-switch>
          <span>{{showCurrentAvailable}}</span>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="currentShare.comment"></el-input>
        </el-form-item>
      </el-form>
        </el-tab-pane>
        <el-tab-pane label="权限" name="second" style="margin-top: 0">
          <div style="max-height: 300px; overflow: auto">
            <table>
              <tr>
                <th>名称</th>
                <th>写</th>
                <th>读</th>
              </tr>
              <tbody>
              <div @click="showUserList = !showUserList" class="table-label">
                <i :class="showUserList ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"></i>
                <span>用户账户</span>
              </div>
              <tr v-show="showUserList" v-for="user in userList" :key="user.name">
                <td>{{user.name}}</td>
                <td><input type="checkbox" :name="user.name" :checked="user.write" @click="handleUserCheckbox(user.name, 0)"/></td>
                <td><input type="checkbox" :name="user.name" :checked="user.read" @click="handleUserCheckbox(user.name, 1)"/></td>
              </tr>
              <div @click="showGroupList = !showGroupList" class="table-label">
                <i :class="showGroupList ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"></i>
                <span>用户组</span>
              </div>
              <tr v-show="showGroupList" v-for="(group, index) in groupList" :key="index">
                <td>{{group.name}}</td>
                <td><input type="checkbox" :name="index" :checked="group.write" @click="handleGroupCheckbox(index, group.name, 0)"/></td>
                <td><input type="checkbox" :name="index" :checked="group.read" @click="handleGroupCheckbox(index, group.name, 1)"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked2" size="small">确 定</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getShareList, createShare, deleteShare, setShare } from '@/api/file/fileshare'
  import { getUserList, getGroupList } from '@/api/file/user'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'fileShare',
    components: {
      iTable,
      iButton
    },
    computed: {
      isShare() {
        return this.currentShare.directory === ''
      },
      showBrowseable() {
        this.newShare.browseable = this.isBrowseable ? 'yes' : 'no'
        return this.isBrowseable ? '开启' : '关闭'
      },
      showPublic() {
        this.newShare.public = this.isPublic ? 'yes' : 'no'
        return this.isPublic ? '开启' : '关闭'
      },
      showAvailable() {
        this.newShare.available = this.isAvailable ? 'yes' : 'no'
        return this.isAvailable ? '开启' : '关闭'
      },
      showCurrentBrowseable() {
        this.currentShare.browseable = this.currentBrowseable ? 'yes' : 'no'
        return this.currentBrowseable ? '开启' : '关闭'
      },
      showCurrentPublic() {
        this.currentShare.public = this.currentPublic ? 'yes' : 'no'
        return this.currentPublic ? '开启' : '关闭'
      },
      showCurrentAvailable() {
        this.currentShare.available = this.currentAvailable ? 'yes' : 'no'
        return this.currentAvailable ? '开启' : '关闭'
      }
    },

    data() {
      return {
        loading: false,
        check: 'checked',
        showUserList: false,
        showGroupList: false,
        userList: [],
        groupList: [],
        activeName: 'first',
        isBrowseable: true,
        isPublic: false,
        isAvailable: true,
        currentBrowseable: false,
        currentPublic: false,
        currentAvailable: false,
        authData: [],
        newShare: {
          directory: '',
          comment: '',
          browseable: 'yes',
          path: '',
          public: 'no',
          available: 'yes',
          readUsers: [],
          readGroups: [],
          writeUsers: [],
          writeGroups: [],
          forceCreateMode: '',
          forceDirectoryMode: ''
        },
        currentShare: {
          oldDirectory: '',
          directory: '',
          comment: '',
          browseable: 'yes',
          path: '',
          public: 'no',
          available: 'yes',
          readUsers: [],
          readGroups: [],
          writeUsers: [],
          writeGroups: [],
          forceCreateMode: '',
          forceDirectoryMode: ''
        },
        edit: '编辑',
        value: '',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        labels: [
          {
            label: '名称',
            prop: 'directory'
          }, {
            label: '路径',
            prop: 'path'
          }, {
            label: '注释',
            prop: 'comment'
          }]
      }
    },

    methods: {
      handleUserCheckbox(name, num) {
        let nodeList = document.getElementsByName(name)
        console.log(nodeList[num])
        if (num === 0) {
          this.userList = this.userList.map(user => {
            if (user.name === name) {
              if (nodeList[num].checked) {
                user.write = 'checked'
              } else {
                user.write = ''
              }
            }
            return user
          })
        } else {
          this.userList = this.userList.map(user => {
            if (user.name === name) {
              if (nodeList[num].checked) {
                user.read = 'checked'
              } else {
                user.read = ''
              }
            }
            return user
          })
        }
      },
      handleGroupCheckbox(name, groupName, num) {
        let nodeList = document.getElementsByName(name)
        console.log(nodeList)
        if (num === 0) {
          this.groupList = this.groupList.map(group => {
            if (group.name === groupName) {
              if (nodeList[num].checked) {
                group.write = 'checked'
              } else {
                group.write = ''
              }
            }
            return group
          })
        } else {
          this.groupList = this.groupList.map(group => {
            if (group.name === groupName) {
              if (nodeList[num].checked) {
                group.read = 'checked'
              } else {
                group.read = ''
              }
            }
            return group
          })
        }
      },
      handleDrag() {
        this.$refs.select.blur()
      },
      handleDelete() {
        deleteShare(this.currentShare).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: '共享文件夹删除成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '共享文件夹删除失败！',
              type: 'error'
            })
          }
          this.fetchData()
        })
      },
      handleAuthority() {},
      fetchData() {
        this.tabledata = []
        this.userList = []
        this.groupList = []
        getShareList().then(res => {
          if (res.data.code === 0) {
            this.tabledata = res.data.data.shareList
          } else {
            this.$message({
              message: '共享文件夹信息获取失败，请稍后再试！',
              type: 'error'
            })
          }
          console.log(this.tabledata)
        })

        getUserList().then(res => {
          if (res.data.code === 0 && res.data.data) {
            res.data.data.forEach(item => {
              if (!item.isSystem) {
                this.userList.push({
                  name: item.userName,
                  write: '',
                  read: '',
                  none: ''
                })
              }
            })
          }
        })

        getGroupList().then(res => {
          if (res.data.code === 0 && res.data.data) {
            res.data.data.forEach(item => {
              if (!item.isSystem) {
                this.groupList.push({
                  name: item.groupName,
                  write: '',
                  read: '',
                  none: ''
                })
              }
            })
          }
        })
      },
      confirmClicked1() {
        this.loading = true
        createShare(this.newShare).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible1 = false
            this.$message({
              message: '新增共享文件夹成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '新增共享文件夹失败！',
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
        this.userList = this.userList.map(user => {
          return {
            name: user.name,
            write: '',
            read: '',
            none: ''
          }
        })
        this.groupList = this.groupList.map(group => {
          return {
            name: group.name,
            write: '',
            read: '',
            none: ''
          }
        })
        if (row.readUsers && row.readUsers.length > 0) {
          row.readUsers.forEach(item => {
            this.userList.forEach(user => {
              if (user.name === item) {
                user.read = 'checked'
              }
            })
          })
        }
        if (row.writeUsers && row.writeUsers.length > 0) {
          row.writeUsers.forEach(item => {
            this.userList.forEach(user => {
              if (user.name === item) {
                user.write = 'checked'
              }
            })
          })
        }
        if (row.readGroups && row.readGroups.length > 0) {
          row.readGroups.forEach(item => {
            this.groupList.forEach(group => {
              if (group.name === item) {
                group.read = 'checked'
              }
            })
          })
        }
        if (row.writeGroups && row.writeGroups.length > 0) {
          row.writeGroups.forEach(item => {
            this.groupList.forEach(group => {
              if (group.name === item) {
                group.write = 'checked'
              }
            })
          })
        }
      },
      confirmClicked2() {
        this.currentShare.readUsers = []
        this.currentShare.writeUsers = []
        this.currentShare.readGroups = []
        this.currentShare.writeGroups = []
        this.loading = true
        this.userList.forEach(item => {
          if (item.read === 'checked') {
            this.currentShare.readUsers.push(item.name)
          }
          if (item.write === 'checked') {
            this.currentShare.writeUsers.push(item.name)
          }
        })
        this.groupList.forEach(item => {
          if (item.read === 'checked') {
            this.currentShare.readGroups.push(item.name)
          }
          if (item.write === 'checked') {
            this.currentShare.writeGroups.push(item.name)
          }
        })
        console.log(this.currentShare)
        // console.log(this.userList)
        setShare(this.currentShare).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible2 = false
            this.$message({
              message: '共享文件夹配置成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '共享文件夹配置失败！',
              type: 'error'
            })
          }
          this.fetchData()
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      currentchange(val) {
        if (val) {
          this.currentShare = val
          this.currentShare.oldDirectory = val.directory
          this.currentBrowseable = this.getSwitchState(this.currentShare.browseable)
          this.currentPublic = this.getSwitchState(this.currentShare.public)
          this.currentAvailable = this.getSwitchState(this.currentShare.available)
        }
      },
      getSwitchState(state) {
        if (state === 'yes') {
          return true
        } else {
          return false
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
    .table-label
      text-align: left
      cursor: pointer
    .table-content
      width 100%
      max-height 300px
      overflow auto
    table
      width 100%
      max-height: 300px;
      overflow: auto
      tr
        height: 32px
        line-height 32px
        th
          background-color #f4f4f5
        td
          text-align center
      tr:nth-child(2n)
        background-color #f4f4f5
</style>

<style lang="stylus" rel="stylesheet/scss">
  .el-input__inner
    height: 30px
</style>
