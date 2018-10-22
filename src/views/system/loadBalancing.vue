<template>
  <div class="container">
    <div class="title">负载均衡设置</div>
    <div class="dnsbox">
      <el-form label-width="150px"  size="medium">
        <el-form-item label="DNS服务器：">
          <span>{{domainServer}}</span>
          <el-button @click="showserver=!showserver" type="primary" style="margin-left: 60px">{{serverbtn}}</el-button>
        </el-form-item>
        <el-form-item label="添加DNS服务器：" v-show="showserver" class="boxshow">
          <el-input v-model="newserver" style="width: 180px"></el-input>
          <el-button type="primary" @click="changeserver">确定</el-button>
          <el-button @click="showserver=false" type="info">取消</el-button>
        </el-form-item>
        <el-form-item label="服务器状态：">
          <el-switch
            v-model="value" @change="changeState">
          </el-switch>
          <span>{{state}}</span>
        </el-form-item>
        <el-form-item label="域名：">
          <span>{{domain}}</span>
          <el-button type="primary" style="margin-left: 20px" @click="showdomain=!showdomain">修改</el-button>
        </el-form-item>
        <el-form-item label="修改域名：" v-show="showdomain" class="boxshow">
          <el-input style="width: 180px" v-model="newdomain"></el-input>
          <el-button type="primary" @click="changeDomain">确定</el-button>
          <el-button @click="showdomain=false" type="info">取消</el-button>
        </el-form-item>
        <el-form-item label="上级DNS：">
          <div class="box">
            <el-radio-group v-model="checkedforwarder">
              <el-radio
                v-for="(item, index) in forwarder" :key="index"
                :label="item"
                border size="medium" style="margin-bottom: 2px;margin-left: 5px">
                {{item}}
              </el-radio>
            </el-radio-group>
          </div>
          <el-button @click="shownew=!shownew" type="primary">新增</el-button>
          <el-button type="danger" @click="deleteForwarder">删除</el-button>
        </el-form-item>
        <el-form-item label="新增上级DNS：" v-show="shownew" class="boxshow">
          <el-input v-model="newforwarder" style="width: 180px"></el-input>
          <el-button type="primary" @click="addForwarder">确定</el-button>
          <el-button @click="shownew=false" type="info">取消</el-button>
        </el-form-item>
        <el-form-item label="负载服务器：">
          <div class="box">
            <el-radio-group v-model="checkedclient">
              <el-radio
                v-for="(item, index) in clients" :key="index"
                :label="item"
                border size="medium" style="margin-bottom: 2px;margin-left: 5px">
                {{item}}
              </el-radio>
            </el-radio-group>
          </div>
          <el-button @click="showclient=!showclient" type="primary">新增</el-button>
          <el-button type="danger" @click="deleteClient">删除</el-button>
        </el-form-item>
        <el-form-item label="新增负载服务器：" v-show="showclient" class="boxshow">
          <el-input v-model="newclient" style="width: 180px"></el-input>
          <el-button type="primary" @click="addClient">确定</el-button>
          <el-button @click="showclient=false" type="info">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { serveraction, getState, getServer, changeServer, getforwarder, getdomain,
    changedomain, addforwarder, deleteforwarder,
    getclients, addclient, deleteclient } from '@/api/system/balancing'
  export default {
    name: 'loadBalancing',
    data() {
      return {
        action: '',
        domainServer: '',
        showserver: false,
        newserver: '',
        serverbtn: '修改',
        shownew: false,
        value: true,
        state: '开启',
        domain: '',
        newdomain: '',
        showdomain: false,
        forwarder: [],
        newforwarder: '',
        checkedforwarder: '',
        clients: [],
        checkedclient: '',
        newclient: '',
        showclient: false
      }
    },
    methods: {
      changeState(val) {
        console.log(val)
        if (val) {
          this.action = 'restart'
        } else {
          this.action = 'stop'
        }
        serveraction(this.action).then(res => {
          console.log(res)
        })
      },
      setState() {
        getState().then(res => {
          if (res.data.data === ' active (running) ') {
            this.state = '开启'
            this.value = true
          } else {
            this.state = '关闭'
            this.value = false
          }
        })
      },
      setServer() {
        getServer().then(res => {
          if (res.data.data.domainServer === '') {
            this.serverbtn = '新增'
          } else {
            this.domainServer = res.data.data.domainServer
          }
        })
      },
      changeserver() {
        changeServer(this.newserver).then(res => {
          if (res.data.code === 5) {
            this.$message({
              message: '修改失败！请输入正确格式的IP',
              type: 'error'
            })
          } else if (res.data.code === 4) {
            this.$message({
              message: 'DNS服务器' + this.serverbtn + '失败，请确认后重试！',
              type: 'error'
            })
          } else {
            this.$message({
              message: 'DNS服务器' + this.serverbtn + '成功',
              type: 'success'
            })
            this.newserver = ''
            this.showserver = false
            this.setServer()
          }
        })
      },
      getDomain() {
        getdomain().then(res => {
          this.domain = res.data.data
        })
      },
      changeDomain() {
        changedomain(this.newdomain).then(res => {
          console.log(res.data.message)
          if (res.data.code === 5) {
            this.$message({
              message: '修改失败！域名格式必须为xxx.xxx.xxx(x为小写字母)',
              type: 'error'
            })
          } else if (res.data.code === 4) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          } else if (res.data.code === 6) {
            this.$message({
              message: '请先设置DNS服务器',
              type: 'error'
            })
          } else {
            this.$message({
              message: '域名修改成功',
              type: 'success'
            })
            this.getDomain()
            this.newdomain = ''
            this.showdomain = false
          }
        })
      },
      getForwarder() {
        getforwarder().then(res => {
          this.forwarder = res.data.data
        })
      },
      addForwarder() {
        addforwarder(this.newforwarder).then(res => {
          if (res.data.message === 'No Balancing server been set!') {
            this.$message({
              message: '添加失败！请先设置DNS服务器',
              type: 'error'
            })
          } else if (res.data.code === 5) {
            this.$message({
              message: '添加失败！请输入正确格式的IP',
              type: 'error'
            })
          } else if (res.data.code === 4) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: 'DNS添加成功',
              type: 'success'
            })
            this.getForwarder()
            this.newforwarder = ''
            this.shownew = false
          }
        })
      },
      deleteForwarder() {
        if (this.checkedforwarder === '') {
          this.$message({
            message: '请选择需要删除的DNS',
            type: 'error'
          })
        } else {
          deleteforwarder(this.checkedforwarder).then(res => {
            if (res.data.message === 'No Balancing server been set!') {
              this.$message({
                message: '删除失败！请先设置DNS服务器',
                type: 'error'
              })
            } else if (res.data.code === 5) {
              this.$message({
                message: '删除失败！',
                type: 'error'
              })
            } else if (res.data.code === 4) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else {
              this.$message({
                message: 'DNS删除成功',
                type: 'success'
              })
              this.getForwarder()
              this.checkedforwarder = ''
            }
          })
        }
      },
      getClients() {
        getclients().then(res => {
          this.clients = res.data.data
        })
      },
      addClient() {
        addclient(this.newclient).then(res => {
          if (res.data.message === 'No Balancing server been set!') {
            this.$message({
              message: '添加失败！请先设置DNS服务器',
              type: 'error'
            })
          } else if (res.data.code === 5) {
            this.$message({
              message: '添加失败！请输入正确格式的IP',
              type: 'error'
            })
          } else if (res.data.code === 4) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: '负载服务器添加成功',
              type: 'success'
            })
            this.getClients()
            this.newclient = ''
            this.showclient = false
          }
        })
      },
      deleteClient() {
        if (this.checkedclient === '') {
          this.$message({
            message: '请选择需要删除的负载服务器',
            type: 'error'
          })
        } else {
          deleteclient(this.checkedclient).then(res => {
            if (res.data.message === 'No Balancing server been set!') {
              this.$message({
                message: '删除失败！请先设置DNS服务器',
                type: 'error'
              })
            } else if (res.data.code === 5) {
              this.$message({
                message: '删除失败！',
                type: 'error'
              })
            } else if (res.data.code === 4) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else {
              this.$message({
                message: '负载服务器删除成功',
                type: 'success'
              })
              this.getClients()
              this.checkedclient = ''
            }
          })
        }
      }
    },
    mounted() {
      this.setState()
      this.setServer()
      this.getDomain()
      this.getForwarder()
      this.getClients()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 20px
    margin-right 48px
    .title
      font-weight bolder
      color: #333
      margin-bottom 10px
    .dnsbox
      min-width 500px
      width: 80%
      background-color #fff
      padding 20px
      color #606266
      .box
        margin-bottom 5px
        border solid 1px rgba(170, 170, 170, 0.5)
        padding 5px 5px 5px 5px
        max-width 500px
      .boxshow
        background-color #f4f4f5
        padding-top 5px
        padding-bottom 5px
</style>
