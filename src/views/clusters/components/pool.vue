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
    <i-dialog title="新增数据池" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">数据池名称： </div>
        <input v-model="newPool.name" placeholder="输入数据池名称"/>
      </div>
      <div class="form">
        <div class="label">对象组数量： </div>
        <input v-model="newPool.pgNum" placeholder="输入对象组"/>
      </div>
      <div class="form">
        <div class="label">冗余方式： </div>
        <el-radio v-model="type" label="replicated" @change="replicatedmode">副本</el-radio>
        <el-radio v-model="type" label="erasure" @change="erasuremode">纠删码</el-radio>
      </div>
      <div class="form">
        <div class="label">映射规则： </div>
        <select id="rule">
          <option v-for="rule in ruleName" :key="rule" :value="rule" :label="rule"></option>
        </select>
      </div>
      <div class="form" v-show="type === 'erasure'">
        <div class="label">纠删码规则： </div>
        <select id="ecProfile">
          <option v-for="ec in ecProfile" :key="ec" :value="ec" :label="ec"></option>
        </select>
      </div>
    </i-dialog>

    <i-dialog title="配置数据池" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">数据池名称： </div>
        <div class="label" id="poolName" style="text-align: left">{{poolName}}</div>
      </div>
      <div class="form">
        <div class="label">副本数： </div>
        <input id="size" v-model="size"/>
      </div>
      <div class="form">
        <div class="label">对象组数量： </div>
        <input id="pg_num" v-model="pg_num"/>
      </div>
      <div class="form">
        <div class="label">pgs： </div>
        <input id="pgp_num" v-model="pgp_num"/>
      </div>
      <div class="form">
        <div class="label">配额： </div>
        <input id="max_bytes" v-model="max_bytes"/>
      </div>
    </i-dialog>
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
        this.dialogVisible1 = false
        this.newPool.ecProfile = document.getElementById('ecProfile').value
        this.newPool.ruleName = document.getElementById('rule').value
        this.newPool.pgpNum = this.newPool.pgNum
        createPool(this.newPool).then(res => {
          if (res.data.code === 0) {
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
        this.dialogVisible2 = false
        this.tabledata.forEach(item => {
          if (item.name === this.poolName) {
            if (item.size !== this.size) {
              let params = {
                size: this.size
              }
              changePool(this.poolName, params).then(res => {
                console.log(res.data)
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
