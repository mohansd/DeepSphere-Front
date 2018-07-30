<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增数据节点" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-table :osd="isosd" :osdlabels="osdlabels" :osdData="osdData" :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
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
  import { getList } from '@/api/clusters/dataNode'
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
        time: null,
        isosd: true,
        osdData: [],
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        osdlabels: [{
          label: 'ID',
          prop: 'id'
        }, {
          label: '状态',
          prop: 'id'
        }, {
          label: 'PGs',
          prop: 'numpg'
        }, {
          label: '使用',
          prop: 'stat'
        }, {
          label: 'Read bytes',
          prop: 'op_out_bytes'
        }, {
          label: 'Write bytes',
          prop: 'op_in_bytes'
        }, {
          label: 'Read ops',
          prop: 'op_r'
        }, {
          label: 'Write ops',
          prop: 'op_w'
        }],
        labels: [
          {
            label: '节点名',
            prop: 'hostname'
          }, {
            label: 'IP',
            prop: 'ip'
          }]
      }
    },
    methods: {
      fetchData() {
        getList().then(response => {
          const data = response.data.data
          this.tabledata = data
          data.forEach(item => {
            this.osdData.push(item.osds)
          })
          console.log(this.tabledata)
        })
          .catch(err => {
            console.log(err)
          })
        this.time = setInterval(() => {
          getList().then(response => {
            const data = response.data.data
            this.tabledata = data
            data.forEach(item => {
              this.osdData.push(item.osds)
            })
            console.log(this.tabledata)
          })
            .catch(err => {
              console.log(err)
            })
        }, 1000)
      },
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
    },
    mounted() {
      this.fetchData()
    },
    beforeDestroy() {
      clearInterval(this.time)
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
