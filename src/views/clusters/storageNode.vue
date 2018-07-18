<template>
  <div class="container">
    <i-table :tabledata="tabledata" :labels="labels" edit="编辑"></i-table>
  </div>
</template>

<script>
  import iTable from './../../components/Table/index'
  export default {
    name: 'storageNode',
    components: {
      iTable
    },
    data() {
      return {
        edit: '编辑',
        tabledata: [
          {
            name: 'data_node1',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          },
          {
            name: 'data_node2',
            ip: '192.168.3.12',
            capacity: '50G',
            osd: 3
          }
        ],
        labels: [
          {
            label: '节点名',
            prop: 'name'
          }, {
            label: 'IP',
            prop: 'ip'
          }, {
            label: 'OSDs',
            prop: 'osd'
          }]
      }
    }
  }
</script>

<style scoped lang="stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
</style>
