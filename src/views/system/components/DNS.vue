<template>
    <div class="container">
      <el-row>
        <el-col :span="6" v-for="(dns, index) in data" :key="dns.ip">
          <div class="mycheck" @click="handleCheck">
            <input type="radio" :value=dns.ip :id=dns.ip name="dns" />
            <label
              :for=dns.ip
              :style="{borderColor: index===checked? '#409EFF': '#dcdfe6',
              color: index===checked? '#409EFF': '#606266'}">
              {{dns.ip}}
              <svg-icon :icon-class="isOpen ? 'choose' : 'notchoose'" @click.native="handleChange"></svg-icon>
            </label>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'DNS',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        checked: null,
        isOpen: false
      }
    },
    mounted() {
    },
    methods: {
      handleCheck() {
        let radios = document.getElementsByName('dns')
        radios.forEach((item, index) => {
          if (item.checked === true) {
            this.checked = index
          }
        })
      },
      handleChange() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style scoped lang="stylus">
.container
  margin auto
  width 650px
  margin-bottom 0
  border: 1px solid #dcdfe6
  display inline-block
  .mycheck
    margin-right 5px
    input[type=radio]
      display none
    label
      padding-left 10px
      line-height 30px
      display block
      height: 30px
      margin auto
      border: 1px solid #dcdfe6
</style>
