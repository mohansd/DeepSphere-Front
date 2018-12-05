<template>
  <div class="container">
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click="dialogVisible1=true" size="medium">新增节点</el-button>
    <el-button type="danger" size="medium" :disabled="isNode" @click="handleDelete" icon="el-icon-close">删除节点</el-button>
    <el-table
      v-loading="loading"
      border
      stripe
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="tableData"
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="hostname"
        label="主机">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">{{scope.row.status.includes('inactive') ? '开启' : '关闭'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :show-close="false"
      title="新增对象网关存储节点"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="30px" size="mini"
               v-loading="loading"
               element-loading-text="新增对象网关存储节点..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="IP">
          <el-input v-model="newNodeIP"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleNodeAdd" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getRgwList, addRgw, deleteRgw } from '../../api/rgw/rgw'

  export default {
    name: 'Rgw',
    data() {
      return {
        loading: false,
        tableData: [],
        dialogVisible1: false,
        isNode: true,
        newNodeIP: '',
        currentNode: {}
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getRgwList().then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
          }
        })
      },
      handleNodeAdd() {
        this.loading = true
        addRgw(this.newNodeIP).then(res => {
          this.loading = false
          this.newNodeIP = ''
          if (res.data.code === 0) {
            this.$message({
              message: '新增对象网关存储节点成功！',
              type: 'success'
            })
            this.fetchData()
            this.dialogVisible1 = false
          } else {
            this.$message({
              message: '新增对象网关存储节点失败： ' + res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '新增对象网关存储节点失败： ' + err,
            type: 'error'
          })
          this.loading = false
        })
      },
      handleEdit(index, row) {
        // rgw服务器开关功能未完成
        console.log('click edit!')
      },
      handleDelete() {
        deleteRgw(this.currentNode.ip).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除对象网关存储节点成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除对象网关存储节点失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },
      handleCurrentChange(val) {
        if (val) {
          this.isNode = false
          this.currentNode = val
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
</style>

