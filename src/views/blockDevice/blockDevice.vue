<template>
  <div class="container">

    <!--<el-alert-->
      <!--style="height: 50px; margin-bottom: 20px"-->
      <!--v-show="showAlert"-->
      <!--:title="alert.message"-->
      <!--:type="alert.type">-->
    <!--</el-alert>-->

    <div class="alert" :class="`alert-${alert.type}`" v-show="showAlert">
      {{alert.message}}
      <span>
        <i class="el-icon-close" @click="showAlert = false"></i>
      </span>
    </div>

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
      v-loading="tableLoading"
      border
      stripe
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="tableData"
      ref="imageTable"
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="pool"
        label="存储池">
      </el-table-column>
      <el-table-column
        prop="image"
        label="镜像">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)">{{scope.row.status === '失效' ? '开启' : '关闭'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div  style="margin-top: 20px" v-show="currentImage.pool">
      <el-button type="primary" class="my-button" icon="el-icon-plus" size="medium" @click="dialogVisible4 = true">创建快照</el-button>
      <el-button type="danger" size="medium" :disabled="isSnap" @click="deleteSnap" icon="el-icon-close">删除快照</el-button>
      <el-table
        style="margin-top: 20px"
        v-loading="snapLoading"
        border
        stripe
        highlight-current-row
        @current-change="handleCurrentSnapChange"
        :data="snapData"
        ref="snapTable">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="snap"
          label="snap">
        </el-table-column>
        <el-table-column
          prop="size"
          label="size">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="createdTime">
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
              <el-button
              v-loading="rollbackLoading"
              element-loading-text="正在恢复"
              element-loading-spinner="el-icon-loading"
              customClass="customClass"
              @click="handleSnap(scope.$index, scope.row)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
        <el-form-item label="存储池">
          <el-select v-model="newImage.pool" placeholder="请选择">
            <el-option
              v-for="item in rbdPools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="镜像名">
          <el-input v-model="newImage.image"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible3 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleAddImage" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="创建快照"
      :visible.sync="dialogVisible4"
      width="400px"
      center>
      <el-form ref="form" label-width="60px" size="mini"
               v-loading="loading"
               element-loading-text="创建镜像..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="存储池">
          <el-input v-model="newSnap.pool" disabled></el-input>
        </el-form-item>
        <el-form-item label="镜像名">
          <el-input v-model="newSnap.image" disabled></el-input>
        </el-form-item>
        <el-form-item label="快照">
          <el-input v-model="newSnap.snap"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible4 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="createSnap" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as apiRbd from '../../api/rbd/rbd'
  import { getData } from '@/api/overview/overview'
  import io from 'socket.io-client'

  export default {
    name: 'blockDevice',
    data() {
      return {
        showAlert: false,
        alert: {
          type: '',
          message: ''
        },
        isImage: true,
        loading: false,
        tableLoading: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        pools: [],
        rbdPools: [],
        deletePool: '',
        newRbd: '',
        newImage: {
          pool: '',
          image: '',
          size: 102400
        },
        tableData: [],
        currentImage: {},
        snapData: [],
        snapLoading: false,
        newSnap: {
          pool: '',
          image: '',
          snap: ''
        },
        isSnap: true,
        currentSnap: {},
        rollbackLoading: false
      }
    },
    mounted() {
      const socket = io(`${process.env.BASE_API}/rbd`)
      socket.on('callback', data => {
        this.rollbackLoading = false
        this.showAlert = true
        this.alert.type = data.code === 0 ? 'success' : 'error'
        this.alert.message = data.message
        // if (data.code === 0) {
        //   this.$notify.success({
        //     title: '快照恢复成功',
        //     message: data.message
        //   })
        // } else {
        //   this.$notify.error({
        //     title: '快照恢复失败',
        //     message: data.message
        //   })
        // }
      })
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.isImage = true
        apiRbd.getRbd().then(res => {
          this.tableData = []
          if (res.data.code === 0) {
            const data = res.data.data
            this.rbdPools = data.map(item => item.pool)
            data.forEach(pool => {
              pool.images.forEach(image => {
                this.tableData.push({
                  pool: pool.pool,
                  image: image.image,
                  status: image.isTarget ? '生效' : '失效'
                })
              })
            })
          }
        })
        getData().then(res => {
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

      handleAddImage() {
        this.loading = true
        apiRbd.addImage(this.newImage).then(res => {
          this.loading = false
          this.newImage.image = ''
          this.newImage.pool = ''
          if (res.data.code === 0) {
            this.fetchData()
            this.dialogVisible3 = false
            this.$message({
              message: '创建镜像成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '创建镜像失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },

      handleDeletePool() {
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
        this.tableLoading = true
        apiRbd.deleteImage(this.currentImage.pool, this.currentImage.image).then(res => {
          this.tableLoading = false
          if (res.data.code === 0) {
            this.fetchData()
            this.$message({
              message: '删除镜像成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '删除镜像失败： ' + res.data.message,
              type: 'error'
            })
          }
        })
      },

      handleEdit(index, row) {
        this.tableLoading = true
        const params = {
          method: row.status === '失效' ? 'addTarget' : 'removeTarget',
          pool: row.pool,
          image: row.image
        }
        apiRbd.setImageTarget(params).then(res => {
          this.tableLoading = false
          if (res.data.code === 0) {
            this.fetchData()
            this.$message({
              message: '镜像状态修改成功！',
              type: 'success'
            })
          } else {
            this.fetchData()
            this.$message({
              message: '镜像状态修改失败： ' + res.data.message,
              type: 'error'
            })
          }
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
          this.currentImage = val
          this.newSnap.pool = val.pool
          this.newSnap.image = val.image
          this.getsnapData()
        }
      },
      getsnapData() {
        const params = {
          pool: this.currentImage.pool,
          image: this.currentImage.image
        }
        this.snapLoading = true
        apiRbd.getsnap(params).then(res => {
          this.snapLoading = false
          if (res.data && res.data.code === 0) {
            this.snapData = res.data.data
          }
        })
      },
      createSnap() {
        this.snapLoading = true
        apiRbd.createsnap(this.newSnap).then(res => {
          this.snapLoading = false
          if (res.data && res.data.code === 0) {
            this.$message.success('快照创建成功')
            this.dialogVisible4 = false
            this.newSnap = {
              pool: '',
              image: '',
              snap: ''
            }
            this.getsnapData()
          } else {
            this.$message.error('快照创建失败')
          }
        })
      },
      handleCurrentSnapChange(val) {
        if (val) {
          this.isSnap = false
          this.currentSnap = val
        }
      },
      deleteSnap() {
        this.snapLoading = true
        const params = {
          pool: this.currentImage.pool,
          image: this.currentImage.image,
          snap: this.currentSnap.snap
        }
        apiRbd.deletesnap(params).then(res => {
          this.snapLoading = false
          if (res.data && res.data.code === 0) {
            this.$message.success('快照删除成功')
            this.currentSnap = {}
            this.getsnapData()
          } else {
            this.$message.error('快照删除失败')
          }
        })
      },
      handleSnap(index, row) {
        const params = {
          pool: this.currentImage.pool,
          image: this.currentImage.image,
          snap: row.snap
        }
        this.rollbackLoading = true
        apiRbd.rollbacksnap(params).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message.error('快照恢复中')
          } else {
            this.$message.error('快照恢复失败')
            this.rollbackLoading = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    .alert
      padding 10px 20px
      border-radius 4px
      margin-bottom 20px
      span
        float right
        cursor pointer
    .alert-success
      background-color #f0f9eb
      color #67c23a
    .alert-error
      background-color #fef0f0
      color #f56c6c
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
