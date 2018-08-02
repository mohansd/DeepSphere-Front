<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增共享文件夹" @click.native="getCandidates"></i-button>
    <i-button type="refresh" @click.native="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增共享文件夹" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">名称： </div>
        <input v-model="now.name"/>
      </div>
      <div class="form">
        <div class="label">设备： </div>
        <el-select v-model="value" @change="selected">
          <el-option v-for="item in Candidates" :key="item.uuid" :value="item.uuid" class="my-selset"
                  :label="item.description"></el-option>
        </el-select>
      </div>
      <div class="form">
        <div class="label">路径： </div>
        <input v-model="now.reldirpath"/>
      </div>
      <div class="form">
        <div class="label">注释： </div>
        <input v-model="now.comment"/>
      </div>
    </i-dialog>
    <i-dialog title="配置共享文件夹" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">名称： </div>
        <input v-model="now.name"/>
      </div>
      <div class="form">
        <div class="label">设备： </div>
        <input v-model="now.device"/>
      </div>
      <div class="form">
        <div class="label">路径： </div>
        <input v-model="now.reldirpath"/>
      </div>
      <div class="form">
        <div class="label">注释： </div>
        <input v-model="now.comment"/>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import { getList, getShareMgmt, setShareMgmt, getCandidates } from '@/api/file/fileshare'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'fileShare',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        edit: '编辑',
        value: '',
        dialogVisible1: false,
        dialogVisible2: false,
        Candidates: [],
        now: {
          device: '',
          name: '',
          uuid: '',
          reldirpath: '',
          comment: '',
          mntentref: ''
        },
        tabledata: [
          {
            name: 'common',
            device: '192.168.3.12',
            path: 'common/',
            notes: ''
          }
        ],
        labels: [
          {
            label: '名称',
            prop: 'name'
          }, {
            label: '设备',
            prop: 'device'
          }, {
            label: '路径',
            prop: 'path'
          }, {
            label: '注释',
            prop: 'comment'
          }]
      }
    },
    methods: {
      selected(value) {
        this.now.uuid = value
        console.log(value)
        getShareMgmt(value).then(res => {
          console.log(res)
        })
      },
      getCandidates() {
        this.dialogVisible1 = true
        getCandidates().then(res => {
          console.log(res.data)
          this.Candidates = res.data
          console.log(this.Candidates)
        })
      },
      refresh() {
        this.fetchData()
      },
      fetchData() {
        this.tabledata = []
        console.log('data')
        getList().then(res => {
          let data = res.data.data
          console.log(data)
          data.forEach(item => {
            this.tabledata.push({
              name: item.name,
              device: item.device,
              path: item.reldirpath,
              comment: item.comment,
              uuid: item.uuid,
              mntentref: item.mntentref
            })
          })
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        setShareMgmt(this.now).then(res => {
          this.$message({
            message: '共享文件夹配置成功！',
            type: 'success'
          })
          this.fetchData()
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        this.now.device = row.device
        this.now.mntentref = row.mntentref
        this.now.name = row.name
        this.now.reldirpath = row.path
        this.now.comment = row.comment
        this.now.uuid = row.uuid
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        console.log(this.now)
        setShareMgmt(this.now).then(res => {
          this.$message({
            message: '共享文件夹配置成功！',
            type: 'success'
          })
          this.fetchData()
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
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

<style lang="stylus" rel="stylesheet/scss">
  .el-input__inner
    height: 30px
</style>
