<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增告警接收人" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="refresh"></i-button>
    <i-button type="delete" @click.native="deleteReceiver"></i-button>
    <div class="container">
      <div class="title">告警发送人： {{mailSender.auth.user}}
        <el-button type="primary" @click="isnew = !isnew" size="mini" style="margin-left: 150px;">{{text}}</el-button>
      </div>
      <el-form size="mini"
               v-model="mailSender"
               label-width="150px"
               style="width: 400px;margin-left: 20px;margin-top: 10px;"
               v-show="isnew">
        <el-form-item label="smtp服务地址">
          <el-input v-model="mailSender.host"></el-input>
        </el-form-item>
        <el-form-item label="smtp服务地址端口">
          <el-input v-model="mailSender.port"></el-input>
        </el-form-item>
        <el-form-item label="https">
          <el-switch
            v-model="mailSender.secure"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>{{mailSender.secure ? '启用' : '关闭'}}</span>
        </el-form-item>
        <el-form-item label="发送者邮箱">
          <el-input v-model="mailSender.auth.user"></el-input>
        </el-form-item>
        <el-form-item label="授权码">
          <el-input v-model="mailSender.auth.pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmClicked2">确定</el-button>
          <el-button type="primary" @click="fetchData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <br/>
    <i-table :tabledata="tabledata" :labels="labels"
             @currentchange="currentchange"
             style="min-width: 500px"
             :showedit="false" ></i-table>

    <el-dialog
      :show-close="false"
      title="新增告警接收人"
      :visible.sync="dialogVisible1"
      width="400px"
      center>
      <el-form ref="form" label-width="120px" size="mini">
        <el-form-item label="接收人姓名：">
          <el-input v-model="newreceiver.name"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址：">
          <el-input v-model="newreceiver.account"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
            <el-button @click="cancelClicked1" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmClicked1" size="small">确 定</el-button>
          </span>
    </el-dialog>


    <!--<i-dialog title="新增告警接收人" :show="dialogVisible1"-->
              <!--@confirmClicked="confirmClicked1"-->
              <!--@cancelClicked="cancelClicked1">-->
      <!--<div style="height: 20px;font-size: 12px;line-height:20px;background-color: #bddbf5;margin-left: 50px;margin-right: 60px">当集群出现故障时，系统将会通过邮件的方式通知告警接收人</div>-->
      <!--<div class="form">-->
        <!--<div class="label">接收人姓名： </div>-->
        <!--<input v-model="newreceiver.name"/>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">邮件地址： </div>-->
        <!--<input v-model="newreceiver.account"/>-->
      <!--</div>-->
    <!--</i-dialog>-->


    <!--<i-dialog title="修改发送人信息" :show="dialogVisible2"-->
              <!--@confirmClicked="confirmClicked2"-->
              <!--@cancelClicked="cancelClicked2">-->
      <!--<div class="form">-->
        <!--<div class="label">smtp服务地址： </div>-->
        <!--<input v-model="mailSender.host"/>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">smtp服务地址端口： </div>-->
        <!--<input v-model="mailSender.port"/>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">https： </div>-->
        <!--<input v-model="mailSender.secure"/>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">发送者邮箱： </div>-->
        <!--<input v-model="mailSender.auth.user"/>-->
      <!--</div>-->
      <!--<div class="form">-->
        <!--<div class="label">授权码： </div>-->
        <!--<input v-model="mailSender.auth.pass"/>-->
      <!--</div>-->
    <!--</i-dialog>-->
  </div>
</template>

<script>
  import iTable from './../../../components/Table/index'
  import iButton from './../../../components/Button/iButton'
  import { getmailSender, setmailSender, getmailReceiver, addmailReceiver, deletemailReceiver } from '../../../api/system/mail'

export default {
    name: 'alarmManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        isnew: false,
        account: '',
        text: '',
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        mailSender: {
          host: 'smtp.163.com', //  [string] smtp服务地址
          port: 25, //  [num] smtp服务地址端口
          secure: false, //  [bool] 是否启用https, 默认为false
          auth: {
            user: 'deepsphere@163.com', //  [string] 发送者邮箱
            pass: 'deepsphere123' //  [string] 授权码
          }

        },
        newreceiver: {
          name: '',
          account: ''
        },
        curreceiver: {
          name: '',
          account: ''
        },
        senderTable: [{
          name: '',
          email: ''
        }],
        senderlabels: [
          {
            label: '告警发送人',
            prop: 'name'
          }, {
            label: '邮件地址',
            prop: 'email'
          }],
        labels: [
          {
            label: '告警接收人',
            prop: 'name'
          }, {
            label: '邮件地址',
            prop: 'account'
          }]
      }
    },
    methods: {
      fetchData() {
        getmailSender().then(res => {
          let data = res.data.data
          if (data) {
            this.text = '修改'
            this.mailSender = Object.assign(data, {})
          } else {
            this.text = '新增'
          }
        })
        getmailReceiver().then(res => {
          console.log(res)
          this.tabledata = res.data.data.receivers
        })
      },
      currentchange(val) {
        if (val) {
          this.curreceiver = val
        }
      },
      refresh() {
        this.fetchData()
      },
      deleteReceiver() {
        deletemailReceiver(this.curreceiver.account).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '告警接收人删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除出错，请确认后重试！',
              type: 'error'
            })
          }
        })
      },
      confirmClicked1() {
        this.dialogVisible1 = false
        if (this.newreceiver.name === '' || this.newreceiver.account === '') {
          this.$message({
            message: '请完整填写告警接收人信息！',
            type: 'error'
          })
        } else {
          console.log(this.newreceiver)
          addmailReceiver(this.newreceiver).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.$message({
                message: '告警接收人添加成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '告警接收人添加失败！',
                type: 'error'
              })
              this.fetchData()
              this.newreceiver.name = ''
              this.newreceiver.account = ''
            }
          })
        }
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
        setmailSender(this.mailSender).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: '发送人信息修改成功！',
              type: 'success'
            })
            this.fetchData()
          }
        })
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .table-container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    width 80%
    min-height 500px
    .container
      margin-top 10px
      padding-bottom 10px
      width 90%
      min-width: 500px
      background-color: #fff
      border: 0.5px solid rgba(190, 190, 190, 0.5)
      padding-top 20px
      .title
        margin-left 20px
        font-weight bolder
        color: #333
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
</style>
