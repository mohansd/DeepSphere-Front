<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增Pool" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="refreshdata"></i-button>
    <i-button type="delete" @click.native="deletePool"></i-button>
    <i-table :tabledata="tabledata" :labels="labels"
             edit="配置"
             @currentchange="handlecurrentchange"
             @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增Pool" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">Pool名： </div>
        <input v-model="newPool.name" placeholder="输入Pool名"/>
      </div>
      <div class="form">
        <div class="label">pg： </div>
        <input v-model="newPool.pg_num" placeholder="输入pg"/>
      </div>
    </i-dialog>
    <i-dialog title="配置Pool" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">Pool名： </div>
        <input v-model="currentPool.name"/>
      </div>
      <div class="form">
        <div class="label">副本数： </div>
        <input v-model="currentPool.size"/>
      </div>
      <div class="form">
        <div class="label">pg： </div>
        <input v-model="currentPool.pg_num"/>
      </div>
      <div class="form">
        <div class="label">pgs： </div>
        <input v-model="currentPool.pgp_num"/>
      </div>
      <div class="form">
        <div class="label">配额： </div>
        <input v-model="currentPool.max_objects"/>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, createPool, getPool, changePool, deletePool } from '@/api/clusters/pool'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'shelfManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        newPool: {
          name: '',
          pg_num: 20
        },
        currentPool: {
          name: '',
          size: '',
          pg_num: 0,
          pgp_num: 0,
          max_objects: 0
        },
        tabledata: [],
        labels: [
          {
            label: 'Pool名',
            prop: 'name'
          }, {
            label: '已用空间',
            prop: 'used'
          }, {
            label: '对象数',
            prop: 'object'
          }, {
            label: '最大可用',
            prop: 'max_avail'
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
              name: item.name,
              used: item.stats.bytes_used,
              object: item.stats.objects,
              max_avail: item.stats.max_avail
            })
          })
        })
      },
      refreshdata() {
        this.fetchData()
      },
      deletePool() {
        console.log(this.currentPool.name)
        deletePool(this.currentPool.name).then(res => {
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
      confirmClicked1() {
        this.dialogVisible1 = false
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
        this.currentPool.name = row.name
        getPool(row.name).then(res => {
          this.currentPool.size = res.data.data.size
          this.currentPool.pg_num = res.data.data.pg_num
          this.currentPool.pgp_num = res.data.data.pgp_num
          this.currentPool.max_objects = res.data.data.max_objects
        })
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        changePool(this.currentPool).then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$message({
              message: 'Pool配置成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '出现错误，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handlecurrentchange(val) {
        if (val) {
          console.log(val)
          this.currentPool.name = val.name
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
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block;
        width: 120px;
        text-align: right
</style>
