<template>
  <i-tabs :labels="labels">
    <template slot="NFS设置">
      <div class="container" >
        <!--<el-form label-width="120px">-->
          <!--<el-form-item label="NFS设置">-->
            <!--<el-switch-->
              <!--v-model="nfsState"-->
              <!--active-color="#13ce66"-->
              <!--inactive-color="#ff4949">-->
            <!--</el-switch>-->
            <!--<span style="color: #606266; line-height: 40px;font-size: 14px">-->
              <!--{{nfsState ? '开启' : '关闭'}}</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="small" @click="setnfsStat">保存</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      </div>
    </template>
    <template slot="SAMBA设置">
      <div class="alertinfo" v-show="showrestart">
        <span>SAMBA设置已修改，重启服务器后生效。若不重启，当前页面刷新或关闭后修改将失效。</span>
        <el-button type="primary" size="medium" @click="restart">确定重启</el-button>
      </div>
      <el-button size="medium" @click="ischange=!ischange"
                 type="primary" style="margin-left: 20px">修改</el-button>
      <div class="container">
        <el-form size="small" label-width="120px">
          <el-form-item label="工作组：">
            <span v-show="!ischange">{{samba.workgroup}}</span>
            <el-input v-model="newsamba.workgroup" style="width: 200px" v-show="ischange"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <span v-show="!ischange">{{samba.serverString}}</span>
            <el-input v-model="newsamba.serverString" style="width: 200px" v-show="ischange"></el-input>
          </el-form-item>
          <el-form-item label="加密方式：">
            <span v-show="!ischange">{{samba.security}}</span>
            <el-select v-model="newsamba.security" placeholder="请选择" style="width: 200px" v-show="ischange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="加密数据库：">
            <span v-show="!ischange">{{samba.passdbBackend}}</span>
            <el-input v-model="newsamba.passdbBackend" style="width: 200px" v-show="ischange"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-show="ischange" @click="setsamba">确定</el-button>
            <el-button type="info" v-show="ischange" @click="clickcancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </i-tabs>
</template>

<script>
  import { sambaSetting, setSMB, restartSMB, nfsFreshShare, nfsRestart, nfsStop } from '@/api/file/nas'
  import iTabs from './../../components/Tabs/index'
  export default {
    name: 'NAS',
    components: {
      iTabs
    },
    data() {
      return {
        nfsState: true,
        showrestart: false,
        ischange: false,
        labels: ['NFS设置', 'SAMBA设置'],
        sambadata: '',
        samba: {
          enable: false,
          workgroup: '',
          serverString: '',
          security: '',
          passdbBackend: ''
        },
        newsamba: {
          enable: false,
          workgroup: '',
          serverString: '',
          security: '',
          passdbBackend: ''
        },
        nfs: {
          enable: false,
          numproc: 8
        },
        options: [{
          value: 'user',
          label: 'user'
        }, {
          value: 'share',
          label: 'share'
        }]
      }
    },
    methods: {
      fetchData() {
        let params = {
          'method': 'smbGetGlobal',
          'params': null
        }
        sambaSetting(params).then(res => {
          if (res.data.code === 0) {
            this.sambadata = res.data.data
            this.samba.workgroup = res.data.data.workgroup
            this.samba.serverString = res.data.data.serverString
            this.samba.security = res.data.data.security
            this.samba.passdbBackend = res.data.data.passdbBackend
            this.newsamba.workgroup = res.data.data.workgroup
            this.newsamba.serverString = res.data.data.serverString
            this.newsamba.security = res.data.data.security
            this.newsamba.passdbBackend = res.data.data.passdbBackend
          } else {
            this.$message({
              message: 'SAMBA服务获取失败',
              type: 'error'
            })
          }
        })
        // getStat().then(res => {
        //   if (res.data.code === 0) {
        //     this.nfsState = res.data.data.isStart
        //   }
        // })
      },
      setnfsStat() {
        if (this.nfsState) {
          // 启用-保存：先发送nfsFreshShare，再发送nfsRestart；关闭-保存：nfsStop
          nfsFreshShare().then(res => {
            if (res.data.code === 0) {
              nfsRestart().then(res => {
                if (res.data.code === 0) {
                  this.$message({
                    message: 'NFS设置保存成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: 'NFS设置保存失败',
                    type: 'error'
                  })
                }
                this.fetchData()
              })
            } else {
              this.$message({
                message: 'NFS设置保存失败',
                type: 'error'
              })
              this.fetchData()
            }
          })
        } else {
          nfsStop().then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: 'NFS设置保存成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: 'NFS设置保存失败',
                type: 'error'
              })
            }
            this.fetchData()
          })
        }
      },
      restart() {
        restartSMB().then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: 'SAMBA服务重启成功',
              type: 'success'
            })
            this.showrestart = false
          } else {
            this.$message({
              message: 'SAMBA服务重启失败',
              type: 'error'
            })
          }
        })
      },
      clickcancel() {
        this.ischange = false
        let data = {
          workgroup: this.sambadata.workgroup,
          serverString: this.sambadata.serverString,
          security: this.sambadata.security,
          passdbBackend: this.sambadata.passdbBackend
        }
        this.newsamba = data
        // this.newsmba.passdbBackend = ''
        // this.newsmba.security = ''
        // this.newsmba.serverString = ''
        // this.newsmba.workgroup = ''
      },
      setsamba() {
        this.ischange = false
        let data = {
          workgroup: this.newsamba.workgroup,
          serverString: this.newsamba.serverString,
          security: this.newsamba.security,
          passdbBackend: this.newsamba.passdbBackend
        }
        this.samba = data
        setSMB(this.newsamba).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: 'SAMBA设置修改成功',
              type: 'success'
            })
            this.showrestart = true
          } else {
            this.$message({
              message: 'SAMBA设置修改失败',
              type: 'error'
            })
          }
        })
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    margin-left 20px
    margin-top 20px
    font-weight 900
  .container
    margin-top 10px
    margin-left 20px
    width 95%
    background-color: #fff
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    padding-top 20px
    padding-bottom 20px
  .alertinfo
    margin-top 10px
    margin-left 20px
    width 95%
    padding-top 20px
    padding-bottom 20px
    padding-left: 20px
    margin-bottom: 20px
    background-color: #fdf6ec
</style>
