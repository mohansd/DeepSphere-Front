<template>
    <div class="container">
      <el-button
        type="primary"
        class="my-button"
        icon="el-icon-plus"
        @click="dialogVisible1=true"
        size="medium">
        新增节点
      </el-button>
      <el-button
        type="danger"
        size="medium"
        :disabled="isNode"
        @click="handleDelete"
        icon="el-icon-close">
        删除节点
      </el-button>
      <el-table
        v-loading="loading"
        border
        stripe
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="tableData"
        style="width: 100%;margin-top: 20px">
        <el-table-column
          prop="hostName"
          label="主机">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP">
        </el-table-column>
        <el-table-column
          label="smb">
          <template slot-scope="scope" >
            <el-button :type="scope.row.status.smb ? 'success' : 'danger'" circle @click="handleSetService('smb', scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="nfs">
          <template slot-scope="scope">
            <el-button :type="scope.row.status.nfs ? 'success' : 'danger'" circle @click="handleSetService('nfs', scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="配置">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row, 'start')">开启</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row, 'stop')">关闭</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :show-close="false"
        title="新增NAS节点"
        :visible.sync="dialogVisible1"
        width="400px"
        center>
        <el-form ref="form" label-width="30px" size="mini"
                 v-loading="loading"
                 v-model="newNode"
                 element-loading-text="新增节点..."
                 element-loading-spinner="el-icon-loading">
          <el-form-item label="IP">
            <el-input v-model="newNode.ip"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="addNasNode">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
  import * as apiNas from '@/api/file/nas'

  export default {
    name: 'nfs',
    data() {
      return {
        tableData: [],
        newNode: {
          ip: ''
        },
        isNode: true,
        dialogVisible1: false,
        currentRow: {},
        loading: false
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        apiNas.getNasNodes().then(res => {
          console.log(res)
          if (res.data.data) {
            this.tableData = res.data.data
          }
        })
      },
      addNasNode() {
        console.log(this.newNode)
        apiNas.addNasNode(this.newNode).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message.success('节点添加成功')
          } else {
            this.$message.error('节点添加失败')
          }
        })
      },

      handleSetService(service, row) {
        console.log(row)
        const params = {
          ip: row.ip,
          method: row.status[service] ? 'stop' : 'start',
          service: service
        }
        console.log(params)
        this.loading = true
        apiNas.setServives(params).then(res => {
          if (res.data.code === 0) {
            this.loading = false
            this.$message.success(`${params.service}${row.status[service] ? '关闭' : '开启'}成功`)
            this.fetchData()
          } else {
            this.$message.error(`${params.service}${row.status[service] ? '关闭' : '开启'}失败`)
          }
        })
      },

      handleEdit(row, method) {
        const smbParams = {
          ip: row.ip,
          method: method,
          service: 'smb'
        }
        const nfsParams = {
          ip: row.ip,
          method: method,
          service: 'nfs'
        }
        apiNas.setServives(smbParams).then(res => {
          this.fetchData()
          if (res.data.code === 0) {
            this.$message.success(`smb设置成功`)
          } else {
            this.$message.error(`smb设置失败`)
          }
        })
        apiNas.setServives(nfsParams).then(res => {
          this.fetchData()
          if (res.data.code === 0) {
            this.$message.success(`nfs设置成功`)
          } else {
            this.$message.error(`nfs设置失败`)
          }
        })
      },
      handleDelete() {
        console.log(this.currentRow)
        apiNas.removeNasNode(this.currentRow).then(res => {
          console.log(res)
        })
      },
      handleCurrentChange(row) {
        this.currentRow = row
        this.isNode = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .container
    min-width 500px
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
