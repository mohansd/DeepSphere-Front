<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增机架" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增机架" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">机架名： </div>
        <input placeholder="输入机架名"/>
      </div>
      <div class="form">
        <div class="label">机房： </div>
        <input placeholder="输入机房名"/>
      </div>
    </i-dialog>
    <i-dialog title="配置机架" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">机架： </div>
        <input placeholder="输入节点名"/>
      </div>
      <div class="form">
        <div class="label">机房： </div>
        <input placeholder="输入IP"/>
      </div>
      <div class="form">
        <div class="label" style="vertical-align: top;">删除节点： </div>
        <div style="display: inline-block;height:150px;width:195px;overflow:auto;border: 1px solid rgb(169, 169, 169)">
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node1
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node2
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node3
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node4
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node5
          </div>
          <div style="color: #333;height:20px;margin-top: 10px;margin-left: 20px">
            <input type="checkbox">node6
          </div>
        </div>
        <el-button size="mini" type="primary" style="vertical-align: top;">删除</el-button>
      </div>
      <div class="form">
        <div class="label">增加节点： </div>
        <input placeholder="输入节点名"/>
        <div class="label"></div>
        <input placeholder="输入节点IP"/>
      </div>
    </i-dialog>
  </div>
</template>

<script>
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
