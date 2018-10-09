<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true" size="medium">新增共享文件夹</el-button>
    <el-button type="primary" size="medium" :disabled="isShare" @click.native="handleAuthority" icon="el-icon-view">权限</el-button>
    <el-button type="danger" size="medium" :disabled="isShare" @click.native="handleDelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             @currentchange="currentchange"
             style="margin-top: 20px"
             edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增共享文件夹" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">名称： </div>
        <input v-model="newShare.directory"/>
      </div>
      <div class="form">
        <div class="label">浏览器中访问： </div>
        <el-switch v-model="isBrowseable"></el-switch>
        <span>{{showBrowseable}}</span>
      </div>
      <div class="form">
        <div class="label">路径： </div>
        <input v-model="newShare.path"/>
      </div>
      <div class="form">
        <div class="label">匿名访问： </div>
        <el-switch v-model="isPublic"></el-switch>
        <span>{{showPublic}}</span>
      </div>
      <div class="form">
        <div class="label">资源可用： </div>
        <el-switch v-model="isAvailable"></el-switch>
        <span>{{showAvailable}}</span>
      </div>
      <div class="form">
        <div class="label">注释： </div>
        <input v-model="newShare.comment"/>
      </div>
    </i-dialog>
    <i-dialog title="配置共享文件夹" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <el-tabs v-model="activeName" type="card" style="margin-top: -20px;">
        <el-tab-pane label="文件夹信息" name="first">
          <div class="form">
            <div class="label">名称： </div>
            <input v-model="currentShare.directory"/>
          </div>
          <div class="form">
            <div class="label">浏览器中访问： </div>
            <el-switch v-model="currentBrowseable"></el-switch>
            <span>{{showCurrentBrowseable}}</span>
          </div>
          <div class="form">
            <div class="label">路径： </div>
            <input v-model="currentShare.path"/>
          </div>
          <div class="form">
            <div class="label">匿名访问： </div>
            <el-switch v-model="currentPublic"></el-switch>
            <span>{{showCurrentPublic}}</span>
          </div>
          <div class="form">
            <div class="label">资源可用： </div>
            <el-switch v-model="currentAvailable"></el-switch>
            <span>{{showCurrentAvailable}}</span>
          </div>
          <div class="form">
            <div class="label">注释： </div>
            <input v-model="currentShare.comment"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="权限" name="second" style="margin-top: 0">
          <div style="max-height: 300px; overflow: auto">
            <table>
              <tr>
                <th>名称</th>
                <th>读写</th>
                <th>只读</th>
                <th>禁止读写</th>
              </tr>
              <tbody>
              <div @click="showUserList = !showUserList" class="table-label">
                <i :class="showUserList ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"></i>
                <span>用户账户</span>
              </div>
              <tr v-show="showUserList" v-for="user in userList" :key="user.name">
                <td>{{user.name}}</td>
                <td><input type="checkbox" :checked="check"/></td>
                <td><input type="checkbox" checked/></td>
                <td><input type="checkbox" checked/></td>
              </tr>
              <div @click="showGroupList = !showGroupList" class="table-label">
                <i :class="showGroupList ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"></i>
                <span>用户组</span>
              </div>
              <tr v-show="showGroupList" v-for="(group, index) in groupList" :key="index">
                <td>{{group.name}}</td>
                <td><input type="checkbox" :checked="check"/></td>
                <td><input type="checkbox" checked/></td>
                <td><input type="checkbox" checked/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </i-dialog>
  </div>
</template>

<script>
  import { getShareList, createShare, deleteShare } from '@/api/file/fileshare'
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
        getShareList().then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.tabledata = res.data.data.shareList
          } else {
            this.$message({
              message: '共享文件夹信息获取失败，请稍后再试！',
              type: 'error'
            })
          }
        })

        getUserList().then(res => {
          if (res.data.code === 0 && res.data.data.userList) {
            this.userList = res.data.data.userList.map(item => {
              return {
                name: item.userName,
                write: '',
                read: '',
                none: ''
              }
            })
          }
        })

        getGroupList().then(res => {
          if (res.data.code === 0 && res.data.data.groupList) {
            res.data.data.groupList.forEach(item => {
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
        this.dialogVisible1 = false
        createShare(this.newShare).then(res => {
          if (res.data.code === 0) {
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
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        console.log(this.currentShare)
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
