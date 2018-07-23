<template>
  <div class="container">
    <el-row >
      <el-col :span="11" :offset="1">
        <div class="box" style="height: 200px">
          <div class="title">状态</div>
          <div style="padding-top: 20px;padding-left:20px;color: #FFBD18">HEALTH_WARN</div>
          <ul style="margin-left: 20px">
            <li>OBJECT_MISPLACED: 3/299091</li>
            <li>OBJECT_MISPLACED: 3/299091</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="10" :offset="1">
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="12">
              <div style="background-color: #fff;height: 100px">
                <div class="svg-wrapper">
                  <svg-icon icon-class="datanode"></svg-icon>
                </div>
                <span>监测节点</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="background-color: #fff;height: 100px">
                <div class="svg-wrapper">
                  <svg-icon icon-class="monitornode"></svg-icon>
                </div>
              </div>
            </el-col>
          </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12">
            <div style="background-color: #fff;height: 100px">
              <div class="svg-wrapper">
                <svg-icon icon-class="OSDS"></svg-icon>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="background-color: #fff;height: 100px">
              <div class="svg-wrapper">
                <svg-icon icon-class="setting"></svg-icon>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="11" :offset="1">
        <div class="box" style="height: 300px">
          <div class="title">使用情况</div>
          <el-row style="margin-top: 40px">
            <el-col :span="8">
              <div style="font-size: 50px;font-weight:900;text-align: center;height: 150px;line-height: 150px">99.5k</div>
              <div style="text-align: center;font-weight:900">objects</div>
            </el-col>
            <el-col :span="8">
              <div style="height: 150px">
                <el-progress type="circle" :percentage="80" color="#333" ></el-progress>
              </div>
              <div style=";font-weight:900">Raw capacity</div>
            </el-col>
            <el-col :span="8">
              <div style="height: 150px">
                <el-progress type="circle" :percentage="80" color="#333" ></el-progress>
              </div>
              <div style="font-weight:900">Usage by pool</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10" :offset="1">
        <div class="box" style="height: 400px">
          <div class="title">数据池</div>
          <table style="width: 100%;margin-top: 10px">
            <tr>
              <th>名称</th>
              <th>PG状态</th>
              <th>使用情况</th>
              <th>活动</th>
            </tr>
            <tr style="text-align: center">
              <td>.dawad.ada</td>
              <td>8active</td>
              <td>1.11k/34.0T</td>
              <td>0rd,0wr</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'monitor'
    }
</script>

<style scoped lang="stylus">
.container
  .box
    margin-top 20px
    display inline-block
    height: 300px
    width 100%
    background-color: #fff
    margin-bottom 40px
    box-shadow: 0px 0px 10px 5px #D3D8DD
    .title
      padding-left 20px
      padding-top 10px
      font-weight bolder
      color: #333
  .svg-wrapper
    height: 100%
    width: 30%
    display inline-block
    background-color darkgrey
    font-size 60px
    line-height 100px
    text-align center
</style>
