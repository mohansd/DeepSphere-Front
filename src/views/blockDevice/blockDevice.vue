<template>
    <div class="container">
      <el-button @click="dialogVisible = true">test</el-button>
      <i-table :tabledata="tabledata" :labels="labels" edit="管理"></i-table>
      <i-dialog :show="dialogVisible"
                 title="警告"
                 @confirmClicked="confirmClicked"
                 @cancelClicked="cancelClicked">
        <span>dialog</span>
      </i-dialog>
    </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  export default {
    name: 'blockDevice',
    components: {
      iTable
    },
    data() {
      return {
        dialogVisible: false,
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
      confirmClicked(val) {
        this.dialogVisible = val
        console.log(this.dialogVisible)
      },
      cancelClicked(val) {
        this.dialogVisible = val
      }
    }
  }
</script>

<style scoped lang="stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
</style>
