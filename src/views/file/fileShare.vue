<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增共享文件夹" @click.native="getCandidates"></i-button>
    <i-button type="refresh" @click.native="refresh"></i-button>
    <i-button type="delete" @click.native="deletefile"></i-button>
    <i-table :tabledata="tabledata" :labels="labels"
             @currentchange="currentchange"
             edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增共享文件夹" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">名称： </div>
        <input v-model="newShare.directory"/>
      </div>
      <div class="form">
        <div class="label">浏览器中访问： </div>
        <el-switch
          v-model="isBrowseable"
          active-color="#0063af"
          inactive-color="#a8a8a8">
        </el-switch>
      </div>
      <div class="form">
        <div class="label">路径： </div>
        <input v-model="newShare.path"/>
      </div>
      <div class="form">
        <div class="label">匿名访问： </div>
        <el-switch
          v-model="isPublic"
          active-color="#0063af"
          inactive-color="#a8a8a8">
        </el-switch>
      </div>
      <div class="form">
        <div class="label">资源可用： </div>
        <el-switch
          v-model="isAvailable"
          active-color="#0063af"
          inactive-color="#a8a8a8">
        </el-switch>
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
  import { getShareList } from '@/api/file/fileshare'
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
        isBrowseable: true,
        isPublic: false,
        isAvailable: true,
        newShare: {
          directory: '',
          comment: '',
          browseabel: '',
          path: '',
          public: '',
          available: '',
          readUsers: [],
          readGroups: [],
          writeUsers: [],
          writeGroups: [],
          forceCreateMode: '',
          forceDirectoryMode: ''
        },
        edit: '编辑',
        value: '',
        dialogVisible1: false,
        dialogVisible2: false,
        Candidates: [],
        currentfile: '',
        now: {
          device: '',
          name: '',
          uuid: '',
          reldirpath: '',
          comment: '',
          mntentref: ''
        },
        tabledata: [],
        labels: [
          {
            label: '名称',
            prop: 'directory'
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
      deletefile() {
      },
      getCandidates() {
        this.dialogVisible1 = true
      },
      fetchData() {
        this.tabledata = []
        getShareList().then(res => {
          console.log(res.data.code)
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.tabledata = res.data.data.shareList
          }
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
      },
      cancelClicked1() {
        this.dialogVisible1 = false
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
      },
      confirmClicked2() {
        this.dialogVisible2 = false
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      },
      currentchange(val) {
        if (val) {
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
