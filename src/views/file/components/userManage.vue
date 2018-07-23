<template>
  <div class="table-container">
    <i-button icon="el-icon-plus" text="新增用户" @click.native="dialogVisible1=true"></i-button>
    <i-button icon="el-icon-view" text="权限" @click.native="dialogVisible2=true"></i-button>
    <i-button type="refresh"></i-button>
    <i-button type="delete"></i-button>
    <i-table :tabledata="tabledata" :labels="labels" edit="配置" @clickEdit="EditClicked"></i-table>
    <i-dialog title="新增用户" :show="dialogVisible1"
              @confirmClicked="confirmClicked1"
              @cancelClicked="cancelClicked1">
      <el-tabs class="user-tabs" v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: -20px">
        <el-tab-pane label="常规" name="first">
          <div class="form">
            <div class="label">名称： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">注释： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">Email： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">密码： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">确认密码： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">Shell： </div>
            <input />
          </div>
          <div class="form">
            <div class="label">修改账户： </div>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <span>不允许用户修改自己的账户</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户组" name="second">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </i-dialog>
    <i-dialog title="邮件服务器" :show="dialogVisible2"
              @confirmClicked="confirmClicked2"
              @cancelClicked="cancelClicked2">
      <div style="height: 20px;font-size: 12px;line-height:20px;background-color: #bddbf5;margin-left: 50px;margin-right: 60px">
        使用邮件告警功能之前，先在此配置或修改邮件服务器
      </div>
      <div class="form">
        <div class="label">服务器地址： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">端口号： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">发件人地址： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">用户名： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">密码： </div>
        <input />
      </div>
      <div class="form">
        <div class="label">告警间隔： </div>
        <input />
      </div>
    </i-dialog>
  </div>
</template>

<script>
  import iTable from './../../../components/Table/index'
  import iButton from './../../../components/Button/iButton'
  export default {
    name: 'userManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        value: true,
        activeName2: 'first',
        edit: '编辑',
        dialogVisible1: false,
        dialogVisible2: false,
        tabledata: [
          {
            name: 'Adam',
            email: '123@qq.com'
          },
          {
            name: 'Bob',
            email: 'adwdqwda@qq.com'
          }
        ],
        labels: [
          {
            label: '名称',
            prop: 'name'
          }, {
            label: 'Email',
            prop: 'email'
          }, {
            label: '注释',
            prop: 'notes'
          }]
      }
    },
    methods: {
      confirmClicked1() {
        this.dialogVisible1 = false
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
      },
      cancelClicked2() {
        this.dialogVisible2 = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .table-container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    width 80%
    height: 800px
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block
        width: 120px
        text-align: right
</style>

<style lang="stylus">
  .user-tabs.el-tabs--card>.el-tabs__header
    background-color #BDDBF5
    height: 35px
    padding-top 10px
    padding-left 5px
  .user-tabs.el-tabs--card>.el-tabs__header .el-tabs__item
    background-color #1262aa
    height 25px
    line-height 25px
    color #fff
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  .user-tabs.el-tabs--card>.el-tabs__header .el-tabs__item.is-active
    background-color #f3f3f3
    color #333
</style>
