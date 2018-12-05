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
            @click="handleEdit(scope.$index, scope.row)">{{scope.row.status.includes('running') ? '关闭' : '开启'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :show-close="false"
      title="新增iscsi节点"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="30px" size="mini"
               v-loading="loading"
               element-loading-text="新增节点..."
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
  import * as apiIscsi from '../../api/rbd/iscsi'
  export default {
    name: 'IscsiNode',
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
        apiIscsi.getIscsi().then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data.map(node => {
              return {
                hostname: node.hostname,
                ip: node.ip,
                status: node.status.split(')')[0] + ')'
              }
            })
          }
        })
      },
      handleNodeAdd() {
        this.loading = true
        apiIscsi.addIscsi(this.newNodeIP).then(res => {
          this.loading = false
          this.newNodeIP = ''
          if (res.data.code === 0) {
            this.$message({
              message: '新增iscsi节点成功！',
              type: 'success'
            })
            this.fetchData()
            this.dialogVisible1 = false
          } else {
            this.$message({
              message: '新增iscsi节点失败： ' + res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '新增iscsi节点失败： ' + err,
            type: 'error'
          })
          this.loading = false
        })
      },
      handleEdit(index, row) {
        console.log(row)
        this.loading = true
        const method = row.status.includes('running') ? 'stop' : 'restart'
        apiIscsi.setIscsi(method, row.ip).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.$message({
              message: 'iscsi节点状态修改成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'iscsi节点状态修改失败： ' + res.data.message,
              type: 'error'
            })
          }
          this.fetchData()
          this.currentNode = {}
        }).catch(err => {
          this.$message({
            message: 'iscsi节点状态修改失败： ' + err,
            type: 'error'
          })
          this.loading = false
        })
      },
      handleDelete() {
        this.loading = true
        apiIscsi.deleteIscsi(this.currentNode.ip).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.$message({
              message: '删除iscsi节点成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除iscsi节点失败： ' + res.data.message,
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

