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
          prop="hostname"
          label="主机">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP">
        </el-table-column>
        <el-table-column
          label="smb">
          <template slot-scope="scope">
            <el-button :type="scope.row.smb ? 'success' : 'danger'" circle @click="handleSetService('smb', scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="nfs">
          <template slot-scope="scope">
            <el-button :type="scope.row.nfs ? 'success' : 'danger'" circle @click="handleSetService('nfs', scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="配置">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">关闭</el-button>
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
        tableData: [{
          hostname: 'node',
          ip: '192.168.3.126',
          smb: true,
          nfs: false
        }],
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
        })
      },
      addNasNode() {
        console.log(this.newNode)
        apiNas.addNasNode(this.newNode).then(res => {
          console.log(res)
        })
      },

      handleSetService(service, row) {
        console.log(row)
        const params = {
          ip: row.ip,
          method: row[service] ? 'stop' : 'start',
          service: service
        }
        console.log(params)
      },

      handleEdit(index, row) {
        console.log(index)
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
