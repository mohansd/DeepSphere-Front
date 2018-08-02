<template>
  <div class="wrapper">
    <el-table class="my-table" :data="tabledata"
              @row-click="rowClick"
              :span-method="objectSpanMethod"
              stripe
              highlight-current-row
              @current-change="handleCurrentChange"
              border
              style="width: 100%">
      <el-table-column v-for="(item, index) in labels" :key="index"
                       :prop="item.prop" :label="item.label" >
      </el-table-column>
      <el-table-column v-if="osd" label="osd" prop="osds" width="800">
        <el-table-column v-for="(item, index) in osdlabels" :key="index"
                         :prop="item.prop" :label="item.label" >
        </el-table-column>
      </el-table-column>
      <el-table-column label="配置">
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import lodash from 'lodash'
  export default {
    name: 'index',
    components: {
      lodash
    },
    props: {
      tabledata: Array,
      labels: Array,
      edit: String,
      osd: Boolean,
      osdlabels: Array,
      osdData: Array,
      showedit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentPage: 1,
        objectspan: [],
        row: [0],
        tem: 0
      }
    },
    mounted() {
      this.rowspan()
    },
    methods: {
      rowspan() {
        this.tabledata.forEach((item, index) => {
          if (this.tabledata[index + 1]) {
            if (this.tabledata[index].hostname !== this.tabledata[index + 1].hostname) {
              this.row.push(index + 1)
            }
          }
        })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      },
      rowClick(row, event, column) {
        // const val = JSON.stringify(column)
        this.$emit('clickRow', row)
      },
      handleSizeChange() {
        console.log('sizechanged')
      },
      handleCurrentChange(val) {
        this.$emit('currentchange', val)
      },
      handleEdit(index, row) {
        this.$emit('clickEdit', index, row)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    border: 0.5px solid rgba(190, 190, 190, 0.5)
    width: 90%
    background #fff
    padding-bottom 50px
</style>

<style>
  .my-table.el-table th{
    color: #333;
    text-align: center;
  }
  .my-table.el-table td{
    text-align: center;
  }
</style>
