<template>
  <div class="modal" v-show="dialogVisible">
    <div class="header">
      <span class="title">{{title}}</span>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <div class="confirmbtn" @click="handleConfirm">确定</div>
      <div class="cancelbtn" @click="handleClose">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'iDialog',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '消息'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      dialogVisible() {
        return this.show
      }
    },
    methods: {
      handleConfirm() {
        console.log(this.dialogVisible)
        this.$emit('confirmClicked', false)
      },
      handleClose() {
        this.$emit('cancelClicked', false)
      }
    }

  }
</script>

<style scoped lang="stylus">
  .modal
    left: 40%
    top: 30%
    position absolute
    z-index 999
    width: 450px
    min-height 200px
    max-height 500px
    border-radius 10px
    border 2px solid #1262aa
    padding-bottom 20px
    background #fff
    .header
      border-top-left-radius: 5px
      border-top-right-radius: 5px
      height: 37px
      width: 100%
      background #1262aa
      color: #fff
      text-align left
      line-height: 37px
      .title
        margin-left 25px
        font-size 15px
    .main
      padding-top 20px
      min-height 133px
    .footer
      margin-top 20px
      display flex
      justify-content: space-around
      height: 30px
      .confirmbtn
        background #3f79f6
        text-align center
        width: 60px
        height: 30px
        color: #fff
        line-height 30px
        border-radius 5px
      .confirmbtn:hover
        cursor pointer
      .cancelbtn
        text-align center
        background #898989
        width: 60px
        height: 30px
        color: #fff
        line-height 30px
        border-radius 5px
      .cancelbtn:hover
        cursor pointer
</style>
