<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增负载均衡" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增负载均衡" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">域名： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">DNS IP： </div>
        <input />
      </div>
    </i-dialog>
    <i-dialog title="配置负载均衡" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">域名： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">DNS IP： </div>
        <input />
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'loadBalancing',
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
            name: 'www.gushenxing.com',
            ip: '180.76.155.88'
          }
        ],
        labels: [
          {
            label: '域名',
            prop: 'name'
          }, {
            label: 'DNS IP',
            prop: 'ip'
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
