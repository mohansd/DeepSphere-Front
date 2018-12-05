<template>
  <div class="container">
    <el-button type="primary" size="medium" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true">配置缓存池</el-button>
    <el-button type="primary" icon="el-icon-refresh" @click.native="refreshdata" size="medium">刷新</el-button>
    <el-button type="danger" size="medium" :disabled="isTier" @click.native="deletetier" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             :showedit="false"
             @currentchange="handlecurrentchange"
             style="margin-top: 20px"
             @clickEdit="EditClicked"></i-table>
    <!--<i-dialog title="新增缓存池" :show="dialogVisible1"-->
              <!--@confirmClicked="confirmClicked1"-->
              <!--@cancelClicked="cancelClicked1">-->
      <!--<div class="form">-->
        <!--<div class="label">数据池名称： </div>-->
        <!--<select id="pool" @change="handleSelect()">-->
          <!--<option v-for="pool in pools" :key="pool"-->
                  <!--:value="pool" :label="pool"></option>-->
        <!--</select>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">缓存池： </div>-->
        <!--<select id="cachepool">-->
          <!--<option v-for="pool in pools" :key="pool"-->
                  <!--:disabled="pool === selected"-->
                  <!--:value="pool" :label="pool"></option>-->
        <!--</select>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label"></div>-->
        <!--<span>数据池与缓存池不能相同</span>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">缓存模式： </div>-->
        <!--<select id="mode">-->
          <!--<option value="writeback" label="writeback"></option>-->
        <!--</select>-->
      <!--</div>-->
    <!--</i-dialog>-->

    <el-dialog
      :show-close="false"
      title="新增缓存池"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form label-width="80px" size="mini"
               v-loading = "loading"
               element-loading-text="新增缓存池..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="数据池">
          <el-select v-model="newtier.pool" placeholder="请选择" @change="handleSelect()">
            <el-option
              v-for="item in pools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缓存池">
          <el-select v-model="newtier.cachePool" placeholder="请选择">
            <el-option
              v-for="item in pools"
              :disabled="item === selected"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缓存模式">
          <el-select v-model="newtier.cacheMode" placeholder="请选择">
            <el-option label="writeback" value="writeback">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getList, createtier, deleteTier } from '@/api/clusters/pool'
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
        selected: '',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        isTier: true,
        pools: [],
        tiers: [],
        newtier: {
          pool: '',
          cachePool: '',
          cacheMode: ''
        },
        currenttier: {
          pool: '',
          cachePool: ''
        },
        labels: [
          {
            label: '数据池名称',
            prop: 'name'
          }, {
            label: '缓存池',
            prop: 'tiers'
          }, {
            label: '缓存模式',
            prop: 'mode'
          }]
      }
    },
    methods: {
      fetchData() {
        this.tiers = []
        this.tabledata = []
        this.pools = []
        getList().then(res => {
          let data = res.data.data.pools
          data.forEach(pool => {
            if (pool.tier_of !== -1) {
              this.tiers.push({
                id: pool.pool,
                name: pool.pool_name,
                tier_of: pool.tier_of,
                mode: pool.cache_mode
              })
            }
            this.pools.push(pool.pool_name)
          })
          if (this.tiers.length > 0) {
            this.tiers.forEach(item => {
              data.forEach(pool => {
                if (pool.pool === item.tier_of) {
                  this.tabledata.push({
                    name: pool.pool_name,
                    tiers: item.name,
                    mode: item.mode
                  })
                }
              })
            })
          }
          this.selected = this.pools[0]
        })
      },
      handleSelect() {
        this.selected = this.newtier.pool
      },
      refreshdata() {
        this.fetchData()
      },
      confirmClicked1() {
        if (this.newtier.pool === this.newtier.cachePool) {
          this.newtier.pool = ''
          this.newtier.cachePool = ''
          this.$message({
            message: '数据池与缓存池不能相同！',
            type: 'error'
          })
        } else {
          this.loading = true
          createtier(this.newtier).then(res => {
            this.loading = false
            if (res.data.code === 0) {
              this.dialogVisible1 = false
              this.$message({
                message: '添加成功！',
                type: 'success'
              })
              this.fetchData()
              this.newtier.pool = ''
              this.newtier.cacheMode = ''
              this.newtier.cachePoo = ''
            } else {
              this.$message({
                message: '添加出错，请确认后重试！',
                type: 'error'
              })
            }
          })
        }
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
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handlecurrentchange(val) {
        if (val) {
          console.log(val)
          this.isTier = false
          this.currenttier.pool = val.name
          this.currenttier.cachePool = val.tiers
        }
      },
      deletetier() {
        deleteTier(this.currenttier).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else if (res.data.code === 5) {
            this.$message({
              message: '请选择需要删除的缓存！',
              type: 'error'
            })
          } else {
            this.$message({
              message: '删除出错，请确认后重试！',
              type: 'error'
            })
          }
        })
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
    min-height 500px
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
