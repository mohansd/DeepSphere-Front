<template>
  <div class="container">
    <i-button type="refresh"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="修改对象网关状态" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">节点名： </div>
        <span>mgr_node1</span>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <span>192.168.3.12</span>
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'close',
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
            name: 'rgw_root',
            ip: '192.168.3.12',
            states: '工作'
          },
          {
            name: 'mgr_node',
            ip: '192.168.3.11',
            states: '准备'
          },
          {
            name: 'rgw_row',
            ip: '192.168.3.16',
            states: '停止'
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
            label: '状态',
            prop: 'state'
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
