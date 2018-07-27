<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增共享文件夹" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增共享文件夹" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">名称： </div>
        <input placeholder=""/>
      </div>
      <div class="form">
        <div class="label">设备： </div>
        <select style="width: 195px;background-color: #fff;height: 22px" placeholder="选择数据分区"></select>
      </div>
      <div class="form">
        <div class="label">路径： </div>
      </div>
      <div class="form">
        <div class="label">注释： </div>
        <input placeholder=""/>
      </div>
    </i-dialog>
    <i-dialog title="配置共享文件夹" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">名称： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">设备： </div>
        <input >
      </div>
      <div class="form">
        <div class="label">路径： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">注释： </div>
        <input >
      </div>
    </i-dialog>
  </div>
</template>

<script>
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
        dialogVisible1: false,
        dialogVisible2: false,
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
            prop: 'notes'
          }]
      }
    },
    methods: {
      confirmClicked1() {
        this.dialogVisible1 = false
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
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    }
  }
</script>

<style scoped lang="stylus">
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
