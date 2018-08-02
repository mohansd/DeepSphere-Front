<template>
  <div class="app-wrapper">
    <header>
      <img :src="titleImg" style="margin-top: 20px;margin-left: 20px">
      <img :src="logoImg" style="position: absolute;height: 50px;right: 16px;top: 10px">
      <div class="button">
        <svg-icon icon-class="user"></svg-icon>
        admin
      </div>
      <div class="button" style="right: 30px">
        <svg-icon icon-class="set"></svg-icon>
        设置
      </div>
    </header>
    <div class="container">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import titleImg from '../../assets/img/title.jpg'
  import logoImg from '../../assets/img/logo.jpg'
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    mixins: [ResizeMixin],
    data() {
      return {
        titleImg,
        logoImg
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .app-wrapper
    @include clearfix
    display: flex
    flex-direction: column
    height: 100%
    width: 100%
    background: #f2f2f2
  header
    background: #1062aa
    width: 100%
    height: 100px
  .drawer-bg
    background: #000
    opacity: 0.3
    width: 100%
    top: 0
    height: 100%
    position: absolute
    z-index: 999
  .button
    cursor: pointer
    color: #fff
    position: absolute
    right: 100px
</style>
