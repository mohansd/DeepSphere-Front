<template>
  <div class="modal" v-show="dialogVisible" id="dialog" @mousedown="mousedown">
    <div class="header" id="dragheader">
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
      },
      mousedown(event) {
        const dialogHeader = document.getElementById('dragheader')
        const dragDom = document.getElementById('dialog')
        dialogHeader.style.cssText += ';cursor:move;'
        // dragDom.style.cssText += ';top:30%;'

        const getStyle = (function() {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr]
          } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr]
          }
        })()

        dialogHeader.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeader.offsetLeft
          const disY = e.clientY - dialogHeader.offsetTop

          const dragDomWidth = dragDom.offsetWidth
          const dragDomHeight = dragDom.offsetHeight

          const screenWidth = document.body.clientWidth
          const screenHeight = document.body.clientHeight

          const minDragDomLeft = dragDom.offsetLeft
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

          const minDragDomTop = dragDom.offsetTop
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

          // 获取到的值带px 正则匹配替换
          let styL = getStyle(dragDom, 'left')
          let styT = getStyle(dragDom, 'top')

          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
          } else {
            styL = +styL.replace(/\px/g, '')
            styT = +styT.replace(/\px/g, '')
          }

          document.onmousemove = function(e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY

            // 边界处理
            if (-(left) > minDragDomLeft) {
              left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }

            if (-(top) > minDragDomTop) {
              top = -minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
            // emit onDrag event
            // vnode.child.$emit('dragDialog')
          }

          document.onmouseup = function(e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        // this.selectElement = document.getElementById('dialog')
        // var div1 = this.selectElement
        // this.selectElement.style.cursor = 'move'
        // this.isDowm = true
        // var distanceX = event.clientX - this.selectElement.offsetLeft
        // var distanceY = event.clientY - this.selectElement.offsetTop
        // document.onmousemove = function(ev) {
        //   var oevent = ev || event
        //   div1.style.left = oevent.clientX - distanceX + 'px'
        //   div1.style.top = oevent.clientY - distanceY + 'px'
        // }
        // document.onmouseup = function() {
        //   document.onmousemove = null
        //   document.onmouseup = null
        //   div1.style.cursor = 'default'
        // }
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
