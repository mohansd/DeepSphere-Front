<template>
  <div class="container">
    <el-button type="primary" size="medium" class="my-button" icon="el-icon-plus" @click.native="clickAdd">新增数据池</el-button>
    <el-button type="primary" icon="el-icon-refresh" @click.native="refreshdata" size="medium">刷新</el-button>
    <el-button type="danger" size="medium" :disabled="isPool" @click.native="deletePool" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             edit="配置"
             @currentchange="handlecurrentchange"
             style="margin-top: 20px"
             @clickEdit="EditClicked"></i-table>

    <el-dialog
      :show-close="false"
      title="新增数据池"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="90px" size="mini"
               v-loading="loading"
               element-loading-text="新增数据池..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="数据池名称">
          <el-input v-model="newPool.name"></el-input>
        </el-form-item>
        <el-form-item label="对象组数量">
          <el-input v-model="newPool.pgNum"></el-input>
        </el-form-item>
        <el-form-item label="冗余方式">
          <el-radio v-model="type" label="replicated" @change="replicatedmode">副本</el-radio>
          <el-radio v-model="type" label="erasure" @change="erasuremode">纠删码</el-radio>
        </el-form-item>
        <el-form-item label="映射规则">
          <el-select v-model="newPool.ruleName" placeholder="请选择">
            <el-option
              v-for="item in ruleName"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="映射规则" v-show="type === 'erasure'">
          <el-select v-model="newPool.ecProfile" placeholder="请选择">
            <el-option
              v-for="item in ecProfile"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="配置数据池"
      :visible.sync="dialogVisible2"
      width="450px"
      center>
      <el-form label-width="90px" size="mini"
               v-loading = "loading"
               element-loading-text="配置数据池..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="数据池名称">
          <p style="text-align: center">{{poolName}}</p>
        </el-form-item>
        <el-form-item label="副本数">
          <el-input v-model="size"></el-input>
        </el-form-item>
        <el-form-item label="对象组数量">
          <el-input v-model="pg_num"></el-input>
        </el-form-item>
        <el-form-item label="pgs">
          <el-input v-model="pgp_num"></el-input>
        </el-form-item>
        <el-form-item label="配额">
          <el-input v-model="max_bytes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked2" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import { convert } from '@/utils/convert'
  import { getList, createPool, changePool, deletePool, getcrush, geterasure } from '@/api/clusters/pool'
  import iTable from './../../../components/Table/index'
  export default {
    name: 'shelfManage',
    components: {
      iTable
    },
    watch: {
    },
    data() {
      return {
        loading: false,
        edit: '编辑',
        type: 'replicated',
        ecProfile: [],
        ruleName: [],
        changeconfig: false,
        configs: ['poolName', 'size', 'pg_num', 'pgp_num', 'max_bytes'],
        dialogVisible1: false,
        dialogVisible2: false,
        newPool: {
          name: '',
          pgNum: '',
          pgpNum: '',
          mode: 'replicated',
          ecProfile: '',
          ruleName: ''
        },
        isPool: true,
        poolName: '',
        size: '',
        pg_num: 0,
        pgp_num: 0,
        max_bytes: 0,
        tabledata: [],
        labels: [
          {
            label: '数据池名称',
            prop: 'name'
          }, {
            label: '冗余类型',
            prop: 'type'
          }, {
            label: '对象数',
            prop: 'objects'
          }, {
            label: '使用情况',
            prop: 'usage'
          }, {
            label: '活动',
            prop: 'active'
          }]
      }
    },
    methods: {
      fetchData() {
        this.tabledata = []
        getList().then(res => {
          let data = res.data.data.pools
          console.log(data)
          data.forEach(item => {
            this.tabledata.push({
              name: item.pool_name,
              objects: convert(item.stats.objects.latest),
              usage: convert(item.stats.bytes_used.latest) + '/' + convert(item.stats.max_avail.latest),
              active: convert(item.stats.rd.rate) + 'rd, ' + convert(item.stats.wr.rate) + 'wr',
              size: convert(item.size),
              pg_num: item.pg_num,
              type: this.convertmode(item.type),
              pgp_num: item.pg_placement_num,
              max_bytes: item.quota_max_bytes
            })
          })
          this.changeconfig = false
        })
      },
      convertmode(type) {
        if (type === 1) {
          return 'replicated'
        } else if (type === 3) {
          return 'erasure'
        }
      },
      replicatedmode(newmode) {
        this.newPool.mode = newmode
      },
      erasuremode(newmode) {
        this.newPool.mode = newmode
      },
      refreshdata() {
        this.fetchData()
      },
      deletePool() {
        console.log(this.poolName)
        deletePool(this.poolName).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '出现错误，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      clickAdd() {
        this.dialogVisible1 = true
        geterasure().then(res => {
          this.ecProfile = res.data.data
        })
        getcrush().then(res => {
          this.ruleName = res.data.data
        })
      },
      confirmClicked1() {
        this.loading = true
        this.newPool.pgpNum = this.newPool.pgNum
        createPool(this.newPool).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.dialogVisible1 = false
            this.$message({
              message: '新增Pool成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '出现错误，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(row)
      },
      confirmClicked2() {
        this.loading = true
        this.tabledata.forEach(item => {
          this.loading = false
          this.dialogVisible2 = false
          if (item.name === this.poolName) {
            if (item.size !== this.size) {
              let params = {
                size: this.size
              }
              changePool(this.poolName, params).then(res => {
                if (res.data.code === 0) {
                  this.$message({
                    message: 'Pool配置成功！',
                    type: 'success'
                  })
                  this.changeconfig = true
                  this.fetchData()
                } else {
                  this.$message({
                    message: '出现错误，请确认后重试！',
                    type: 'error'
                  })
                }
              })
            }
            if (item.pg_num !== this.pg_num) {
              let params = {
                pg_num: this.pg_num
              }
              changePool(this.poolName, params).then(res => {
                console.log(res.data)
                if (res.data.code === 0) {
                  this.$message({
                    message: 'Pool配置成功！',
                    type: 'success'
                  })
                  this.changeconfig = true
                } else {
                  this.$message({
                    message: '出现错误，请确认后重试！',
                    type: 'error'
                  })
                }
              })
            }
            if (item.pgp_num !== this.pgp_num) {
              let params = {
                pgp_num: this.pgp_num
              }
              changePool(this.poolName, params).then(res => {
                console.log(res.data)
                if (res.data.code === 0) {
                  this.$message({
                    message: 'Pool配置成功！',
                    type: 'success'
                  })
                  this.changeconfig = true
                } else {
                  this.$message({
                    message: '出现错误，请确认后重试！',
                    type: 'error'
                  })
                }
              })
            }
            if (item.max_bytes !== this.max_bytes) {
              let params = {
                max_bytes: this.max_bytes
              }
              changePool(this.poolName, params).then(res => {
                console.log(res.data)
                if (res.data.code === 0) {
                  this.$message({
                    message: 'Pool配置成功！',
                    type: 'success'
                  })
                  this.changeconfig = true
                } else {
                  this.$message({
                    message: '出现错误，请确认后重试！',
                    type: 'error'
                  })
                }
              })
            }
          }
        })
        if (this.changeconfig === true) {
          this.fetchData()
        }
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handlecurrentchange(val) {
        if (val) {
          console.log(val)
          this.isPool = false
          this.poolName = val.name
          this.size = val.size
          this.pg_num = val.pg_num
          this.pgp_num = val.pgp_num
          this.max_bytes = val.max_bytes
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
</style>
