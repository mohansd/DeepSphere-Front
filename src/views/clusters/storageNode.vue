<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增数据节点" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增数据节点" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">节点名： </div>
        <input placeholder="输入节点名"/>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <input placeholder="输入IP"/>
      </div>
      <div class="form">
        <div class="label">选择数据分区： </div>
        <select style="width: 195px;background-color: #fff;height: 22px" placeholder="选择数据分区"></select>
      </div>
    </i-dialog>
    <i-dialog title="配置数据节点" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">节点名： </div>
        <input placeholder="输入节点名"/>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <input placeholder="输入IP"/>
      </div>
      <div class="form">
        <div class="label" style="vertical-align: top;">删除OSD： </div>
        <div style="display: inline-block;height:150px;width:195px;overflow:auto;border: 1px solid rgb(169, 169, 169)">
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD1
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD2
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD3
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD4
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD5
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">OSD6
          </div>
        </div>
        <el-button size="mini" type="primary" style="vertical-align: top;">删除</el-button>
      </div>
      <div class="form">
        <div class="label">增加OSD： </div>
        <select style="width: 195px;background-color: #fff;height: 22px" placeholder="选择数据分区"></select>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'storageNode',
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
            label: '节点名',
            prop: 'name'
          }, {
            label: 'IP',
            prop: 'ip'
          }, {
            label: 'OSDs',
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
