<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增文件系统" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增文件系统" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">文件系统名： </div>
        <input placeholder="输入文件系统名"/>
      </div>
      <div class="form">
        <div class="label">元数据池： </div>
        <input placeholder="输入元数据池"/>
      </div>
      <div class="form">
        <div class="label">存储数据池： </div>
        <input placeholder="输入存储数据池"/>
      </div>
      <div class="form">
        <div class="label">最大存储空间： </div>
        <input placeholder="输入最大存储空间"/>
      </div>
    </i-dialog>
    <i-dialog title="配置文件系统" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">文件系统名： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">最大空间： </div>
        <input >
      </div>
    </i-dialog>
  </div>
</template>

<script>
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
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [
          {
            name: 'data_node1',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          }
        ],
        labels: [
          {
            label: '机架',
            prop: 'name'
          }, {
            label: '机房',
            prop: 'ip'
          }, {
            label: '服务器',
            prop: 'osd'
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
