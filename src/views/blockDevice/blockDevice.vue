<template>
  <div class="container">
    <div class="title">RBD存储池</div>
    <div class="tag-container">
      <el-tag
        :key="tag"
        v-for="tag in rbdPools"
        closable
        type="info"
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="dialogVisible2 = true" type="primary">+ 初始化存储池</el-button>
    </div>
    <el-button type="primary" class="my-button" icon="el-icon-plus" @click="dialogVisible3=true" size="medium">创建镜像</el-button>
    <el-button type="danger" size="medium" :disabled="isImage" @click="handleDeleteImage" icon="el-icon-close">删除镜像</el-button>
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
      title="初始化RBD缓存池"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="初始化RBD缓存池..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="缓存池">
          <el-select v-model="newRbd" placeholder="请选择">
            <el-option
              v-for="item in pools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleAddPool" size="small">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
      :show-close="false"
      title="销毁RBD缓存池"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <p>确定销毁RBD缓存池: {{deletePool}}?</p>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDeletePool" size="small">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
      :show-close="false"
      title="创建镜像"
      :visible.sync="dialogVisible3"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="创建镜像..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="缓存池">
          <el-select v-model="newRbd" placeholder="请选择">
            <el-option
              v-for="item in pools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleAddImage" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as apiRbd from '../../api/rbd/rbd'
  import { getData } from '@/api/overview/overview'

  export default {
    name: 'blockDevice',
    data() {
      return {
        isImage: true,
        loading: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        pools: [],
        rbdPools: [],
        deletePool: '',
        newRbd: ''
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        apiRbd.getRbd().then(res => {
          console.log(res)
          console.log(res.data)
          if (res.data.code === 0) {
            this.rbdPools = res.data.data.map(item => item.pool)
          }
        })
        getData().then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.pools = res.data.data.pools.map(pool => pool.pool_name)
          }
        })
      },
      handleClose(tag) {
        // this.pools.splice(this.pools.indexOf(tag), 1)
        this.dialogVisible1 = true
        this.deletePool = tag
      },

      handleAddPool() {
        this.loading = true
        apiRbd.initRbd(this.newRbd).then(res => {
          this.loading = false
          this.newRbd = ''
          if (res.data.code === 0) {
            this.fetchData()
            this.dialogVisible2 = false
            this.$message({
              message: '初始化RBD缓存池成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '初始化RBD缓存池失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },

      handleAddImage() {},

      handleDeletePool() {
        console.log(this.deletePool)
        apiRbd.deleteRbd(this.deletePool).then(res => {
          this.deletePool = ''
          if (res.data.code === 0) {
            this.fetchData()
            this.dialogVisible1 = false
            this.$message({
              message: '销毁RBD缓存池成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '销毁RBD缓存池失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },

      handleDeleteImage() {
        console.log(this.deletePool)
        apiRbd.deleteImage(this.deletePool).then(res => {
          this.deletePool = ''
          if (res.data.code === 0) {
            this.fetchData()
            this.dialogVisible1 = false
            this.$message({
              message: '销毁RBD缓存池成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '销毁RBD缓存池失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.pools.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },

      handleCurrentChange(val) {
        if (val) {
          this.isImage = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    .title
      margin-bottom 10px
      font-weight bolder
      color: #333
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
    .tag-container
      background-color #fff
      margin-bottom  20px
      padding 10px
      .el-tag + .el-tag
        margin-left: 10px
      .button-new-tag
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      .input-new-tag
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
</style>
