<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增Pool" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增Pool" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div class="form">
        <div class="label">Pool名： </div>
        <input placeholder="输入Pool名"/>
      </div>
      <div class="form">
        <div class="label">pg： </div>
        <input placeholder="输入pg"/>
      </div>
    </i-dialog>
    <i-dialog title="配置Pool" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">Pool名： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">副本数： </div>
        <input >
      </div>
      <div class="form">
        <div class="label">pg： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">pgs： </div>
        <input >
      </div>
      <div class="form">
        <div class="label">配额： </div>
        <input >
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
            name: '.rgw.root',
            used: '1.11k',
            object: '4',
            copy: 4
          },
          {
            name: 'default.rgw.control',
            used: '0k',
            object: '8',
            copy: 0
          },
          {
            name: 'default.rgw.meta',
            used: '0.38k',
            object: '2',
            copy: 3
          }
        ],
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
            label: '副本',
            prop: 'copy'
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
