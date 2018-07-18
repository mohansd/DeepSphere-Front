<template>
    <div class="container">
      <div class="wrapper">
        <span class="title">集群状态</span>
        <el-row>
          <el-col :span="4" style="background: #304156">
            <div style="background: green;width:100%;height: 100px;color: #fff">
              <div style="text-align: center">状态</div>
              <div style="text-align: center;height: 70px;line-height: 70px;
                           font-size: 25px;font-weight: 900">HEALTHY</div>
            </div>
          </el-col>
          <el-col :span="4" :offset="1" >111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
        </el-row>
      </div>
      <div class="wrapper">
        <span class="title">集群状态</span>
        <el-row>
          <el-col :span="4" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
          <el-col :span="4" :offset="1" style="background: #304156">111</el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'overview'
    }
</script>

<style scoped lang="stylus">
.container
  padding-top 20px
  margin-left 51px
  margin-right 48px
  .wrapper
    border: 1px solid blue
    height: 150px
    .title
      font-size 18px
      font-weight bold
</style>
