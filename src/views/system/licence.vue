<template>
    <div class="container">
      <p class="show-licence">系统有效期至: <br/>
        {{licence}}
      </p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'licence',
    computed: {
      ...mapGetters([
        'licence'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .container
    .show-licence
      padding-top 30%
      width 100%
      height: 500px
      text-align center
      font-size 40px
      color: #333
</style>
