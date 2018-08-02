<template>
      <div class="wrapper">
        <el-table class="my-table" :data="tabledata"
                  @row-click="rowClick"
                  stripe
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  border
                  style="width: 100%">
          <el-table-column v-for="(item, index) in labels" :key="index"
                           :prop="item.prop" :label="item.label" >
          </el-table-column>
          <el-table-column v-if="osd" label="osd" prop="osds" width="800">
            <template slot-scope="scope">
              <tr>
                <th v-for="item in osdlabels" :key="item.label" width="120" height="10">{{item.label}}</th>
              </tr>
              <tr v-for="(item, index) in scope.row.osds" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.in}}, {{item.up}}</td>
                <td>{{item.stats.numpg}}</td>
                <td width="160">{{(item.stats.stat_bytes_used/1073741824).toFixed(2)}}GiB/{{(item.stats.stat_bytes/(1073741824*1024)).toFixed(2)}}TiB</td>
                <td>{{item.stats.op_out_bytes}}B/s</td>
                <td>{{item.stats.op_in_bytes}}B/s</td>
                <td>{{item.stats.op_r}}/s</td>
                <td>{{item.stats.op_w}}/s</td>
                <td><el-button size="mini" type="danger">删除</el-button></td>
              </tr>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="180" v-if="showedit">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)">{{edit}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
</template>

<script>
    export default {
      name: 'index',
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
          currentPage: 1
        }
      },
      methods: {
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
