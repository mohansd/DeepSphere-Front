<template>
  <i-tabs :labels="labels">
    <template slot="数据校验配置">
      <div class="container" >
        <div class="label">校验周期： </div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br/>
        <div class="label" style="padding-top: 20px">开始结束时间：</div>
        <el-time-picker
          v-model="value2"
          :picker-options="{selectableRange: '18:30:00 - 20:30:00'}">
        </el-time-picker>
        至
        <el-time-picker
          arrow-control
          v-model="value3"
          :picker-options="{selectableRange: '18:30:00 - 20:30:00'}">
        </el-time-picker>
      </div>
    </template>
    <template slot="管理页面超时">
      <div class="container" style="height: 200px">
        <div class="label" style="padding-top: 50px;padding-bottom: 40px">页面超时时间： </div>
        <input/>
        <br/>
        <el-button type="primary" size="mini" style="margin-left: 100px">确定</el-button>
        <el-button type="primary" size="mini">重置</el-button>
      </div>
    </template>
    <template slot="DSFS预读配置">
      <div class="container" style="height: 200px">
        <div style="color: red; padding-left: 50px">提示：请慎重修改预读参数，修改该参数后，需要重启相关服务，回导致业务中断</div>
        <div class="label" style="padding-top: 50px;padding-bottom: 40px">预读大小： </div>
        <input/>
        <br/>
        <el-button type="primary" size="mini" style="margin-left: 100px">确定</el-button>
        <el-button type="primary" size="mini">重置</el-button>
      </div>
    </template>
    <template slot="告警管理">
        <alarm-manage></alarm-manage>
    </template>
  </i-tabs>
</template>

<script>
  import iTabs from './../../components/Tabs/index'
  import alarmManage from './components/alarmManage'
  export default {
    name: 'NAS',
    components: {
      iTabs,
      alarmManage
    },
    data() {
      return {
        value: 'week',
        options: [{
          value: 'week',
          label: '一周'
        }, {
          value: 'day',
          label: '一天'
        }, {
          value: 'hour',
          label: '一月'
        }, {
          value: 'halfanhour',
          label: '10天'
        }],
        labels: ['数据校验配置', '管理页面超时', 'DSFS预读配置', '告警管理'],
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
      text-align right
</style>
