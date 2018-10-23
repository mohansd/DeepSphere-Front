<template>
  <div>
    <div class="title">NTP设置</div>
    <div class="container">
      <el-form class="ntpform" label-width="100px" size="mini">
        <el-form-item label="NTP服务器">
          <el-input v-model="ntpconfig.server"></el-input>
        </el-form-item>
        <el-form-item label="同步时间">
          <el-input v-model="ntpconfig.timeInterval"> <template slot="append">(min)</template></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="setNTP">确定</el-button>
          <el-button type="primary" size="mini" @click="resetform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getntpserver, setntpserver } from '../../api/system/ntp'
  export default {
    name: 'NTP',
    components: {
    },
    data() {
      return {
        ntpconfig: {
          server: '',
          timeInterval: ''
        }
      }
    },
    methods: {
      getntp() {
        getntpserver().then(res => {
          let data = res.data.data.config
          this.ntpconfig.server = data.ntpServer
          this.ntpconfig.timeInterval = data.time
        })
      },
      setNTP() {
        setntpserver(this.ntpconfig).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: 'NTP配置成功！',
              type: 'success'
            })
          } else if (res.data.message === 'Server must be ip') {
            this.$message({
              message: 'NTP服务器必须是IP！',
              type: 'error'
            })
          } else if (res.data.message === 'TimeInterval must be a number') {
            this.$message({
              message: '同步时间必须是数字！',
              type: 'error'
            })
          }
        })
      },
      resetform() {
        this.getntp()
      }
    },
    mounted() {
      this.getntp()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    margin-top 1%
    margin-left 1%
    width 80%
    min-width 500px
    height: 200px
    background-color #fff
    position absolute
    padding-top 30px
    .ntpform
      width 300px
  .title
    margin-left 20px
    margin-top 20px
    font-weight bolder
    color: #333
</style>
