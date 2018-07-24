<template>
      <div class="wrapper">
        <el-table class="my-table" :data="tabledata"
                  @row-click="rowClick"
                  stripe
                  border
                  style="width: 100%">
          <el-table-column v-for="(item, index) in labels" :key="index"
                           :prop="item.prop" :label="item.label" width="180">
          </el-table-column>
          <el-table-column label="编辑" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)">{{edit}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="position: absolute;bottom: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
</template>

<script>
    export default {
      name: 'index',
      props: {
        tabledata: Array,
        labels: Array,
        edit: String
      },
      data() {
        return {
          currentPage: 1
        }
      },
      methods: {
        rowClick(row, event, column) {
          const val = JSON.stringify(column)
          console.log('clicked: ' + val)
        },
        handleSizeChange() {
          console.log('sizechanged')
        },
        handleCurrentChange() {
          console.log('currentchanged')
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
  height 80%
  width: 80%
  background #fff
  position absolute
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
