<template>
  <i-tabs :labels="labels">
    <template slot="NFS设置">
      <el-button style="margin-left: 20px">保存</el-button>
      <el-button>重设</el-button>
      <div class="container" >
        <span style="padding-right: 20px">启用</span>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <div style="padding-top: 20px;">本地主机浏览
          <input/>
        </div>
        <span style="font-size: 12px;padding-left: 90px;">指定创建多少个服务器线程</span>
      </div>
    </template>
    <template slot="SAMBA设置">
      <el-button style="margin-left: 20px">保存</el-button>
      <el-button>重设</el-button>
      <div class="title">常规设置</div>
      <div class="container" >
        <div class="label">启用</div>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <div style="padding-top: 10px">
          <div class="label">工作组</div>
          <input/>
        </div>
        <span style="font-size: 12px;padding-left: 125px">当客户端查询时，服务器就会出现在该工作组</span>
        <div style="padding-top: 10px">
          <div class="label">描述</div>
          <input/>
        </div>
        <span style="font-size: 12px;padding-left: 125px">NT描述字段</span>
        <div style="padding-top: 10px">
        <div class="label">本地主机浏览</div>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <span>允许本服务器作为Local master browser， LMB主要是扫描局域网内工作组和电脑名称，如果局域网中没有域控制器建议开启此项</span>
        </div>
        <div style="padding-top: 10px">
          <div class="label">时间服务器</div>
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>允许本服务器作为Windows客户端的时间服务器</span>
        </div>
      </div>
      <div class="title">主目录</div>
      <div class="container" >
        <div >
          <div class="label">启用</div>
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>启用用户主目录</span>
        </div>
        <div style="padding-top: 10px">
          <div class="label">可浏览</div>
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>设为可浏览</span>
          <br/>
          <span style="font-size: 12px;padding-left: 125px">设置后共享会出现在网络的公共列表中</span>
        </div>
      </div>
      <div class="title">WINS</div>
      <div class="container" >
        <div >
          <div class="label">WINS支持</div>
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <span>启用WINS服务器</span>
          <br/>
          <span style="font-size: 12px;padding-left: 125px">作为一个WINS服务器</span>
        </div>
        <div style="padding-top: 10px">
          <div class="label">WINS服务器</div>
          <input/>
          <br/>
          <span style="font-size: 12px;padding-left: 125px">使用指定WINS服务器</span>
        </div>
      </div>
    </template>
  </i-tabs>
</template>

<script>
  import iTabs from './../../components/Tabs/index'
  export default {
    name: 'NAS',
    components: {
      iTabs
    },
    data() {
      return {
        labels: ['NFS设置', 'SAMBA设置'],
        value1: true,
        value2: true
      }
    }
  }
</script>

<style scoped lang="stylus">
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
    padding-left 30px
    padding-bottom 20px
    .label
      width 120px
      display inline-block
</style>
