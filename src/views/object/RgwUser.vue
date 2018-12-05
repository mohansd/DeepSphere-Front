<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" size="medium">新增用户</el-button>
    <el-button type="danger" size="medium" :disabled="isNode" @click="handleDelete" icon="el-icon-close">删除用户</el-button>
    <el-table
      v-loading="loading"
      border
      stripe
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="tableData"
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="user_id"
        label="用户ID"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="display_name"
        label="名称"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="max_buckets"
        label="最大桶数量"
        width="180px">
      </el-table-column>
      <el-table-column
      label="Access Key">
        <template slot-scope="scope">
          <span>{{ scope.row.keys[0].access_key }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Secret Key">
        <template slot-scope="scope">
          <span>{{ scope.row.keys[0].secret_key }}</span>
        </template>
      </el-table-column>
    </el-table>
      <div class="subuser-container" v-show="!isNode">
        <span>{{currentNode.user_id}}的子用户</span>
        <el-button type="primary" class="my-button"
                   icon="el-icon-plus" @click="dialogVisible2=true"
                   style="position: absolute; right: 200px"
                   size="medium">新增</el-button>
        <el-button type="danger" size="medium"
                   :disabled="isNode" @click="handleDeleteSubUser"
                   style="position: absolute; right: 70px"
                   icon="el-icon-close">删除</el-button>
        <el-table
          v-loading="loading"
          border
          stripe
          highlight-current-row
          @current-change="handleSubUserChange"
          :data="currentNode.subusers"
          style="width: 100%;margin-top: 30px">
          <el-table-column
            prop="id"
            label="子用户ID">
          </el-table-column>
          <el-table-column
            prop="permissions"
            label="权限">
          </el-table-column>
          <el-table-column
            prop="secret_key"
            label="Secret Key">
          </el-table-column>
        </el-table>
      </div>

    <el-dialog
      :show-close="false"
      title="新增对象网关存储用户"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="新增对象网关存储用户..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="用户名">
          <el-input v-model="newUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="newUser.displayName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleNodeAdd" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      :title="'新增'+ currentNode.user_id + '子用户'"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="新增子用户..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="用户名">
          <el-input v-model="newsubUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="子用户名">
          <el-input v-model="newsubUser.subName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSubUserAdd" size="small">确 定</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getRgwUserList, addRgwUser, deleteRgwUser, addRgwSubUser, deleteSubRgwUser } from '../../api/rgw/rgwUser'

  export default {
    name: 'RgwUser',
    data() {
      return {
        loading: false,
        tableData: [],
        dialogVisible1: false,
        dialogVisible2: false,
        isNode: true,
        newUser: {
          userName: '',
          displayName: ''
        },
        newsubUser: {
          userName: '',
          subName: ''
        },
        currentNode: {},
        currentSubUser: {}
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getRgwUserList().then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
          }
        })
      },
      handleSubUserAdd() {
        addRgwSubUser(this.newsubUser).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增子用户成功！',
              type: 'success'
            })
            this.isNode = true
            this.fetchData()
            this.dialogVisible2 = false
          } else {
            this.$message({
              message: '新增子用户失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },
      handleNodeAdd() {
        this.loading = true
        addRgwUser(this.newUser).then(res => {
          this.loading = false
          this.newUser.displayName = ''
          this.newUser.userName = ''
          if (res.data.code === 0) {
            this.$message({
              message: '新增对象网关存储用户成功！',
              type: 'success'
            })
            this.fetchData()
            this.dialogVisible1 = false
          } else {
            this.$message({
              message: '新增对象网关存储用户失败： ' + res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '新增对象网关存储用户失败： ' + err,
            type: 'error'
          })
          this.loading = false
        })
      },
      handleDelete() {
        deleteRgwUser(this.currentNode.user_id).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除对象网关存储用户成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除对象网关存储用户失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },
      handleDeleteSubUser() {
        deleteSubRgwUser(this.currentSubUser.id).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除' + this.currentNode.user_id + '子用户用户成功！',
              type: 'success'
            })
            this.isNode = true
            this.fetchData()
          } else {
            this.$message({
              message: '删除' + this.currentNode.user_id + '子用户用户失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },
      handleCurrentChange(val) {
        if (val) {
          this.isNode = false
          this.currentNode = val
          this.newsubUser.userName = val.user_id
          this.currentNode.subusers.forEach(user => {
            this.currentNode.swift_keys.forEach(key => {
              if (key.user === user.id) {
                user.secret_key = key.secret_key
              }
            })
          })
          console.log(val)
        }
      },
      handleSubUserChange(val) {
        console.log(val)
        if (val.id) {
          this.currentSubUser = val
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
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
    .subuser-container
      background-color white
      padding 20px
      transition:height 2s;
      -webkit-transition:height 10s;
</style>

