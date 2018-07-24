<template>
  <div class="container">
    <i-button icon="el-icon-plus" text="新增管理节点" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"
              style="height: 35%"></i-table>
    <div style="font-size:18px;font-weight: 900;margin-top: 22%">模板</div>
    <div class="templatebox">
      <el-row style="margin-top: 25px">
        <el-col :span="3" style="margin-left: 30px">
          <input type="radio">
          <div class="label">Balancer</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Restful</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Balancer</div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 25px">
        <el-col :span="3" style="margin-left: 30px">
          <input type="radio">
          <div class="label">Dashboard</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Restful</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Balancer</div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 25px">
        <el-col :span="3" style="margin-left: 30px">
          <input type="radio">
          <div class="label">Balancer</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Restful</div>
        </el-col>
        <el-col :span="3">
          <input type="radio">
          <div class="label">Balancer</div>
        </el-col>
      </el-row>
      <div style="margin-top: 50px;margin-left: 15%">
        <el-button type="primary" size="mini">确定</el-button>
        <el-button type="info" size="mini" style="margin-left: 30px">取消</el-button>
      </div>
    </div>
    <i-dialog title="新增管理节点" :show="dialogVisible1"
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
    </i-dialog>
    <i-dialog title="配置管理节点" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">节点名： </div>
        <input placeholder="输入节点名"/>
        <el-button type="danger" size="mini">删除</el-button>
      </div>
      <div class="form">
        <div class="label">IP： </div>
        <input placeholder="输入IP"/>
      </div>
      <div class="form" >
        <input type="radio" style="margin-left: 30%;">开启
        <input type="radio" style="margin-left: 30px;">关闭
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'manageNode',
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
            status: '工作'
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            status: '准备'
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            status: '停止'
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
            prop: 'status'
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
        display: inline-block
        width: 120px
        text-align: right
    .templatebox
      position: absolute
      margin-top 10px
      height:300px
      width: 80%
      border: 0.5px solid rgba(190, 190, 190, 0.5)
      background-color: #fff
      .label
        display inline-block
        height 30px
        line-height 30px
        background-color #001528
        color: #fff
        padding-left 10px
        padding-right 10px
        border-radius 5px
</style>
