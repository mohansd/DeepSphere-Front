<template>
    <div class="container">
      <i-button icon="el-icon-plus" text="新增块设备" @click.native="dialogVisible1=true"></i-button>
      <i-button type="refresh"></i-button>
      <i-button icon="el-icon-plus" text="挂载" @click.native="dialogVisible3=true"></i-button>
      <i-button type="delete"></i-button>
      <i-table :tabledata="tabledata" :labels="labels" edit="管理" @clickEdit="EditClicked"
      @cell-click="cellClick"></i-table>
      <i-dialog :show="dialogVisible1"
                 title="新增块设备"
                 @confirmClicked="confirmClicked1"
                 @cancelClicked="cancelClicked1">
        <div class="form">
          <div class="label">块设备名： </div>
          <input placeholder=""/>
        </div>
        <div class="form">
          <div class="label">存储数据池： </div>
          <input placeholder=""/>
        </div>
        <div class="form">
          <div class="label">最大存储空间： </div>
          <input placeholder=""/>
        </div>
      </i-dialog>
      <i-dialog :show="dialogVisible2"
                title="管理块设备"
                @confirmClicked="confirmClicked2"
                @cancelClicked="cancelClicked2">
        <div class="form">
          <div class="label">块设备名： </div>
          <span>DSFS1</span>
        </div>
        <div class="form">
          <div class="label">最大存储空间： </div>
          <input placeholder=""/>
        </div>
      </i-dialog>
      <i-dialog :show="dialogVisible3"
                title="挂载块设备"
                @confirmClicked="confirmClicked3"
                @cancelClicked="cancelClicked3">
        <div class="form">
          <div class="label">块设备名： </div>
          <span>DSFS1</span>
        </div>
        <div class="form">
          <div class="label">挂载client： </div>
          <input placeholder=""/>
        </div>
        <div class="form">
          <div class="label">路径： </div>
          <input placeholder=""/>
        </div>
      </i-dialog>
    </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'blockDevice',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        tabledata: [
          {
            device: 'DS_block_1',
            usedspace: '1123k',
            capacity: '50G',
            objectNum: 30,
            datapool: 'rdb_pool_1'
          },
          {
            device: 'DS_block_2',
            usedspace: '1123k',
            capacity: '50G',
            objectNum: 30,
            datapool: 'rdb_pool_2'
          },
          {
            device: 'DS_block_3',
            usedspace: '1123k',
            capacity: '50G',
            objectNum: 30,
            datapool: 'rdb_pool_3'
          }
        ],
        labels: [
          {
            label: '块设备',
            prop: 'device'
          }, {
            label: '已用空间',
            prop: 'usedspace'
          }, {
            label: '容量',
            prop: 'capacity'
          }, {
            label: '对象数',
            prop: 'objectNum'
          }, {
            label: '数据池',
            prop: 'datapool'
          }]
      }
    },
    methods: {
      cellClick(row, event, col) {
        console.log('clicked: ')
      },
      EditClicked(index, row) {
        this.dialogVisible2 = true
        console.log(index, row)
      },
      confirmClicked1(val) {
        this.dialogVisible1 = val
        console.log(this.dialogVisible1)
      },
      cancelClicked1(val) {
        this.dialogVisible1 = val
      },
      confirmClicked2(val) {
        this.dialogVisible2 = val
        console.log(this.dialogVisible1)
      },
      cancelClicked2(val) {
        this.dialogVisible2 = val
      },
      confirmClicked3(val) {
        this.dialogVisible3 = val
        console.log(this.dialogVisible1)
      },
      cancelClicked3(val) {
        this.dialogVisible3 = val
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
