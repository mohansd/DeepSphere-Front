<template>
  <div>
  <div class="title">修改用户密码</div>
  <div class="container">
    <el-form label-width="100px" :model="password"
             ref="password"
             class="passwordform" size="mini" :rules="rules">
      <el-form-item label="原密码：" prop="oldPassword">
        <el-input v-model="password.oldPassword" :type="oldType" ></el-input>
        <span class="show-pwd" @click="showoldPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="password.newPassword" :type="newType"></el-input>
        <span class="show-pwd" @click="shownewPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item label="确认密码：" prop="repeat">
        <el-input v-model="password.repeat" :type="repeatType" ></el-input>
        <span class="show-pwd" @click="showrepeatPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="changepassword">确定</el-button>
        <el-button type="primary" size="mini" @click="resetform">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  import iButton from './../../components/Button/iButton'
  import { changePassword } from '../../api/login'

export default {
    name: 'user',
    components: {
      iButton
    },
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.password.repeat !== '') {
            this.$refs.password.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.password.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        password: {
          oldPassword: '',
          newPassword: '',
          repeat: ''
        },
        oldType: 'password',
        newType: 'password',
        repeatType: 'password',
        rules: {
          oldPassword: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repeat: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      changepassword() {
        this.$refs.password.validate(valid => {
          if (valid) {
            let params = {
              username: this.$store.state.user.name,
              oldPassword: this.password.oldPassword,
              newPassword: this.password.newPassword
            }
            changePassword(params).then(res => {
              if (res.data.code === 4) {
                this.$message({
                  message: '用户名或密码错误！',
                  type: 'error'
                })
              } else {
                this.$message({
                  message: '用户密码修改成功！',
                  type: 'success'
                })
                this.resetform()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetform() {
        this.password = {
          oldPassword: '',
          newPassword: '',
          repeat: ''
        }
      },
      showoldPwd() {
        if (this.oldType === 'password') {
          this.oldType = ''
        } else {
          this.oldType = 'password'
        }
      },
      shownewPwd() {
        if (this.newType === 'password') {
          this.newType = ''
        } else {
          this.newType = 'password'
        }
      },
      showrepeatPwd() {
        if (this.repeatType === 'password') {
          this.repeatType = ''
        } else {
          this.repeatType = 'password'
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    margin-left 20px
    margin-top 20px
    width 80%
    min-height: 250px
    background-color #fff
    position absolute
    padding-top 20px
    padding-left 10px
    .passwordform
      width 30%
      margin-top 20px
      .show-pwd
        position: absolute
        right: 10px
        top: 0px
        font-size: 16px
        color: #333
        cursor: pointer
        user-select: none
  .title
    margin-left 20px
    margin-top 20px
    font-weight bolder
    color: #333
</style>
