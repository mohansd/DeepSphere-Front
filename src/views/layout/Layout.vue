<template>
  <div class="app-wrapper">
    <header>
      <img :src="titleImg" style="margin-top: 20px;margin-left: 20px">
      <img :src="logoImg" style="position: absolute;height: 50px;right: 16px;top: 10px">
      <div class="button">
        <svg-icon icon-class="user"></svg-icon>
        {{username}}
      </div>
      <div class="button" style="right: 30px">
        <el-dropdown :hide-timeout="1000">
          <div class="avatar-wrapper" style="color: white; cursor: pointer">
            <svg-icon icon-class="set"></svg-icon>
            设置
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                主页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <screenfull></screenfull>
            </el-dropdown-item>
            <el-dropdown-item>
              <span style="display:block;" @click="handleLogout">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="container">
      <sidebar class="sidebar-container"></sidebar>
      <div style="background-color: rgb(48, 65, 86);top:0;width:180px;position:fixed;z-index: 1000;height: 100%"></div>
      <div class="main-container">
        <app-main></app-main>
      </div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import Screenfull from 'components/Screenfull'
  import titleImg from '../../assets/img/title.jpg'
  import logoImg from '../../assets/img/logo.jpg'
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      Screenfull
    },
    mixins: [ResizeMixin],
    data() {
      return {
        titleImg,
        logoImg
      }
    },
    computed: {
      username() {
        console.log(this.$store.state.user.name)
        return this.$store.state.user.name
      }
    },
    methods: {
      handleLogout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .app-wrapper
    @include clearfix
    display: flex
    flex-direction: column
    height: 100%
    width: 100%
    background: #f2f2f2
  header
    z-index 1010
    background: #1062aa
    width: 100%
    height: 100px
    .button
      color: #fff
      position: absolute
      right: 100px
      cursor pointer
  .background
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    position: fixed
    z-index: -1
    background-color: $light_gray
</style>
