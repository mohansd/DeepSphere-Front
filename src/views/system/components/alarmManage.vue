<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增告警接收人" @click.native="dialogVisible1=true"></i-button>
    <i-button type="refresh" @click.native="refresh"></i-button>
    <i-button type="delete" @click.native="deleteReceiver"></i-button>
    <div class="container">
      <div class="title">修改告警接收人信息：</div>
      <el-form size="mini" label-width="120px" style="width: 400px;margin-left: 20px;margin-top: 10px">
        <el-form-item label="告警发送人">
          <el-input v-model="mailsender.token"></el-input>
        </el-form-item>
        <el-form-item label="发送人邮件地址">
          <el-input v-model="mailsender.account"></el-input>
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
             :showedit="false" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增告警接收人" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <div style="height: 20px;font-size: 12px;line-height:20px;background-color: #bddbf5;margin-left: 50px;margin-right: 60px">当集群出现故障时，系统将会通过邮件的方式通知告警接收人</div>
      <div class="form">
        <div class="label">接收人姓名： </div>
        <input v-model="newreceiver.name"/>
      </div>
      <div class="form">
        <div class="label">邮件地址： </div>
        <input v-model="newreceiver.account"/>
      </div>
    </i-dialog>
    <i-dialog title="修改发送人信息" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div class="form">
        <div class="label">告警发送人： </div>
        <input v-model="mailsender.token"/>
      </div>
      <div class="form">
        <div class="label">邮件地址： </div>
        <input v-model="mailsender.account"/>
      </div>
    </i-dialog>
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
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [],
        mailsender: {
          account: '',
          token: ''
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
          let data = res.data.data.config
          this.senderTable[0].name = data.token
          this.senderTable[0].email = data.account
          this.mailsender = data
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
            if (res.data.code === 5) {
              this.$message({
                message: '请填写正确的邮箱！',
                type: 'error'
              })
            } else {
              this.$message({
                message: '告警接收人添加成功！',
                type: 'success'
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
        setmailSender(this.mailsender).then(res => {
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
      width 90%
      height: 180px
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
