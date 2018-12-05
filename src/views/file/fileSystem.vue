<template>
  <div class="container">
    <el-button type="primary" size="medium" class="my-button" icon="el-icon-plus" @click.native="dialogVisible1=true">新增文件系统</el-button>
    <el-button type="primary" size="medium" class="my-button" icon="el-icon-plus" @click.native="dialogVisible2=true" :disabled="isFile">挂载文件系统</el-button>
    <el-button type="primary" icon="el-icon-refresh" @click.native="refresh" size="medium">刷新</el-button>
    <el-button type="danger" size="medium" :disabled="isFile" @click.native="hangledelete" icon="el-icon-close">删除</el-button>
    <i-table :tabledata="tabledata" :labels="labels"
             @clickEdit="EditClicked"
             @currentchange="handlecurrentchange"
             style="margin-top: 20px"
             :loading="loading"
             :showedit="false">
    </i-table>

    <el-dialog
      :show-close="false"
      title="新增文件系统"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="90px" size="mini"
               v-loading="loading"
               element-loading-text="新增文件系统..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="文件系统名">
          <el-input v-model="newfs.fsName"></el-input>
        </el-form-item>
        <el-form-item label="元数据池">
          <el-input v-model="newfs.meta_pool"></el-input>
        </el-form-item>
        <el-form-item label="存储数据池">
          <el-input v-model="newfs.data_pool"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      :show-close="false"
      title="挂载文件系统"
      :visible.sync="dialogVisible2"
      width="400px"
      center>
      <el-form ref="form" label-width="90px" size="mini"
               v-loading="loading"
               element-loading-text="挂载文件系统..."
               element-loading-spinner="el-icon-loading">
        <el-form-item label="IP">
          <el-input v-model="ip"></el-input>
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
  import { getfs, createfs, deletefs, mountfs } from '@/api/file/filesystem'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'fileSystem',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        loading: false,
        edit: '编辑',
        ip: '',
        dialogVisible1: false,
        dialogVisible2: false,
        isFile: true,
        newfs: {
          fsName: '',
          meta_pool: '',
          data_pool: ''
        },
        currentfs: '',
        tabledata: [],
        labels: [
          {
            label: '文件系统名',
            prop: 'name'
          }, {
            label: '已用空间',
            prop: 'used'
          }, {
            label: '最大空间',
            prop: 'avail'
          }, {
            label: '状态',
            prop: 'state'
          }, {
            label: '元数据池',
            prop: 'metapool'
          }, {
            label: '存储数据池',
            prop: 'datapool'
          }]
      }
    },
    methods: {
      fetchData() {
        getfs().then(res => {
          let data = res.data.data
          console.log(data)
          this.tabledata = []
          data.forEach(item => {
            if (item.filesystem.ranks.length === 0) {
              this.tabledata.push({
                name: item.filesystem.name,
                used: (item.filesystem.pools[1].used / (1000000000)).toFixed(1) + 'G',
                avail: (item.filesystem.pools[1].avail / (100000000000)).toFixed(1) + 'T',
                state: 'inactive',
                metapool: item.filesystem.pools[0].pool,
                datapool: item.filesystem.pools[1].pool
              })
            } else {
              this.tabledata.push({
                name: item.filesystem.name,
                used: (item.filesystem.pools[1].used / (1000000000)).toFixed(1) + 'G',
                avail: (item.filesystem.pools[1].avail / (100000000000)).toFixed(1) + 'T',
                state: item.filesystem.ranks[0].state,
                metapool: item.filesystem.pools[0].pool,
                datapool: item.filesystem.pools[1].pool
              })
            }
          })
        })
      },
      refresh() {
        this.fetchData()
      },
      hangledelete() {
        console.log(this.currentfs)
        deletefs(this.currentfs).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '文件系统删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '文件系统删除失败！',
              type: 'error'
            })
          }
        })
      },
      confirmClicked1() {
        this.loading = true
        createfs(this.newfs).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '文件系统添加成功！',
              type: 'success'
            })
            this.loading = false
            this.fetchData()
            this.dialogVisible1 = false
          } else {
            this.$message({
              message: '文件系统添加失败:' + res.data.message,
              type: 'error'
            })
            this.loading = false
          }
        })
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(index, row)
      },
      confirmClicked2() {
        this.dialogVisible2 = false
        this.loading = true
        console.log(this.ip, this.currentfs.name)
        mountfs(this.ip, this.currentfs.name).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.$message({
              message: '挂载成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '挂载失败！',
              type: 'error'
            })
          }
          this.fetchData()
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      handlecurrentchange(val) {
        if (val) {
          this.currentfs = val
          this.isFile = false
          console.log(val)
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
