<template>
  <i-tabs :labels="labels">
    <template slot="管理页面超时">
      <div class="container" style="height: 200px">
        <el-form size="mini" label-width="120px" style="width: 300px;margin-top: 30px">
          <el-form-item label="页面超时时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">确定</el-button>
            <el-button type="primary" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
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
        labels: ['管理页面超时', '告警管理'],
        value1: true,
        value2: true
      }
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
    padding-left 30px
    min-height 180px
</style>
