<template>
  <div class="container">
    <div v-show="showAdd">
      <div class="title">新增</div>
      <div class="rackbox">
        <el-form  label-width="80px" :model="newrack" style="width: 250px"  size="mini">
          <el-form-item label="名称">
            <el-input v-model="newrack.bucketName"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="newrack.bucketType" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addbucket">确定</el-button>
            <el-button type="info" @click="showAdd = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="showMove">
      <div class="title">移动</div>
      <div class="rackbox">
        <el-form  label-width="80px" :model="newrack" style="width: 250px"  size="mini">
          <el-form-item label="移动至">
            <el-select v-model="movebucket.upperBucket" placeholder="请选择">
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级类型">
            <el-input v-model="movebucket.upperBucketType" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="moveBucket">确定</el-button>
            <el-button type="info" @click="showAdd = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-class">
      <el-table
        :data="tabledata"
        border=""
        :span-method="objectSpanMethod"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        :cell-style="cellHover"
        style="width: 100%">
        <el-table-column
          label="区域">
          <template slot-scope="scope">
            <span>{{scope.row.root.name}}</span>
            <el-dropdown v-show="row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span>
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleadd(scope.row.root, 'datacenter')">新增数据中心</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="数据中心">
          <template slot-scope="scope">
            <span>{{scope.row.datacenter.name}}</span>
            <el-dropdown v-show="row === scope.row && row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleadd(scope.row.datacenter, 'room')">新增</el-dropdown-item>
                <el-dropdown-item v-show="scope.row.datacenter.name !== ''">移动</el-dropdown-item>
                <el-dropdown-item @click.native="handledelete(scope.row.datacenter.name)" divided v-show="scope.row.datacenter.name !== ''" >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="机房">
          <template slot-scope="scope">
            <span>{{scope.row.room.name}}</span>
            <el-dropdown v-show="row === scope.row && row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleadd(scope.row.room, 'row')">新增</el-dropdown-item>
                <el-dropdown-item @click.native="handlemove(scope.row.room.name, 'datacenter')"
                  v-show="scope.row.room.name !== ''">移动</el-dropdown-item>
                <el-dropdown-item @click.native="handledelete(scope.row.room.name)"
                  divided v-show="scope.row.room.name !== ''" >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="行">
          <template slot-scope="scope">
            <span>{{scope.row.row.name}}</span>
            <el-dropdown v-show="row === scope.row && row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleadd(scope.row.row, 'rack')">新增</el-dropdown-item>
                <el-dropdown-item @click.native="handlemove(scope.row.row.name, 'room')"
                  v-show="scope.row.row.name !== ''">移动</el-dropdown-item>
                <el-dropdown-item @click.native="handledelete(scope.row.row.name)"
                  divided v-show="scope.row.row.name !== ''">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="机架">
          <template slot-scope="scope">
            <span>{{scope.row.rack.name}}</span>
            <el-dropdown v-show="row === scope.row && row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleadd(scope.row.rack, 'host')">新增</el-dropdown-item>
                <el-dropdown-item @click.native="handlemove(scope.row.rack.name, 'row')">移动</el-dropdown-item>
                <el-dropdown-item @click.native="handledelete(scope.row.rack.name)"
                  divided v-show="scope.row.rack.name !== ''">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="主机">
          <template slot-scope="scope">
            <span>{{scope.row.host.name}}</span>
            <el-dropdown v-show="scope.row.host.name !== '' && row === scope.row && col === scope.column" trigger="click" style="cursor: pointer">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handlemove(scope.row.host.name, 'rack')"
                  v-show="scope.row.host.name !== ''">移动</el-dropdown-item>
                <el-dropdown-item @click.native="handledelete(scope.row.host.name)"
                  divided v-show="scope.row.host.name !== ''">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="OSD">
          <template slot-scope="scope">
            <span>{{scope.row.osd.name}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getList, movebucket, deletebucket } from '@/api/clusters/rack'
  import iTable from './../../components/Table/index'
  import iButton from './../../components/Button/iButton'
  export default {
    name: 'shelfManage',
    components: {
      iTable,
      iButton
    },
    data() {
      return {
        showAdd: false,
        showMove: false,
        selectOptions: [],
        newrack: {
          bucketName: '',
          bucketType: ''
        },
        upperBucket: {
          name: '',
          type: ''
        },
        movebucket: {
          belowBucket: '',
          upperBucket: '',
          upperBucketType: ''
        },
        row: null,
        col: null,
        spanArr: [],
        dataSpan: [],
        roomSpan: [],
        rowSpan: [],
        rackSpan: [],
        hostSpan: [],
        rackdata: {
          root: [],
          datacenter: [],
          room: [],
          row: [],
          rack: [],
          host: [],
          osd: []
        },
        tabledata: [],
        labels: [
          {
            label: '区域',
            prop: 'region'
          }, {
            label: '数据中心',
            prop: 'datacen'
          }, {
            label: '机房',
            prop: 'room'
          }, {
            label: '行',
            prop: 'row'
          }, {
            label: '机架',
            prop: 'rack'
          }, {
            label: '主机',
            prop: 'host'
          }]
      }
    },
    methods: {
      fetchData() {
        getList().then(res => {
          let data = res.data.data
          // this.tabledata = res.data.data
          this.tabledata = data.map((item, index) => {
            if (!item.datacenter) {
              item.datacenter = {
                name: ''
              }
            }
            if (!item.room) {
              item.room = {
                name: ''
              }
            }
            if (!item.row) {
              item.row = {
                name: ''
              }
            }
            if (!item.rack) {
              item.rack = {
                name: ''
              }
            }
            if (!item.host) {
              item.host = {
                name: ''
              }
            }
            if (!item.osd) {
              item.osd = {
                name: ''
              }
            }
            return item
          })
          console.log(data)
          let contactDoc = [0, 0, 0, 0, 0, 0]
          this.spanArr = []
          this.roomSpan = []
          this.dataSpan = []
          this.rowSpan = []
          this.rackSpan = []
          this.hostSpan = []
          this.tabledata.forEach((item, index) => {
            if (index === 0) {
              this.spanArr.push(1)
              this.dataSpan.push(1)
              this.roomSpan.push(1)
              this.rowSpan.push(1)
              this.rackSpan.push(1)
              this.hostSpan.push(1)
            } else {
              if (item.root.name !== '' && item.root.name === this.tabledata[index - 1].root.name) {
                this.spanArr[contactDoc[0]] += 1
                this.spanArr.push(0)
              } else {
                this.spanArr.push(1)
                contactDoc[0] = index
              }
              if (item.datacenter.name !== '' && item.datacenter.name === this.tabledata[index - 1].datacenter.name) {
                this.dataSpan[contactDoc[1]] += 1
                this.dataSpan.push(0)
              } else {
                this.dataSpan.push(1)
                contactDoc[1] = index
              }
              if (item.room.name !== '' && item.room.name === this.tabledata[index - 1].room.name) {
                this.roomSpan[contactDoc[2]] += 1
                this.roomSpan.push(0)
              } else {
                this.roomSpan.push(1)
                contactDoc[2] = index
              }
              if (item.row.name !== '' && item.row.name === this.tabledata[index - 1].row.name) {
                this.rowSpan[contactDoc[3]] += 1
                this.rowSpan.push(0)
              } else {
                this.rowSpan.push(1)
                contactDoc[3] = index
              }
              if (item.rack.name !== '' && item.rack.name === this.tabledata[index - 1].rack.name) {
                this.rackSpan[contactDoc[4]] += 1
                this.rackSpan.push(0)
              } else {
                this.rackSpan.push(1)
                contactDoc[4] = index
              }
              if (item.host.name !== '' && item.host.name === this.tabledata[index - 1].host.name) {
                this.hostSpan[contactDoc[5]] += 1
                this.hostSpan.push(0)
              } else {
                this.hostSpan.push(1)
                contactDoc[5] = index
              }
            }
          })
        })
      },
      handledelete(bucketName) {
        deletebucket(bucketName).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除失败，请确认后重试！',
              type: 'error'
            })
            this.fetchData()
          }
        })
      },
      handlemove(Bucket, upper) {
        this.showMove = true
        let temparr = []
        console.log(Bucket)
        this.movebucket.belowBucket = Bucket
        this.movebucket.upperBucketType = upper
        this.tabledata.forEach(item => {
          if (item[upper].name && item[upper].name !== '') {
            temparr.push(item[upper].name)
          }
        })
        if (temparr.length > 0) {
          temparr = this.deleteduplicate(temparr)
        }
        console.log(temparr)
        this.selectOptions = temparr.map(item => {
          return {
            value: item,
            label: item
          }
        })
      },
      moveBucket() {
        let params = {
          action: 'move',
          belowBucket: this.movebucket.belowBucket,
          upperBucket: this.movebucket.upperBucket,
          upperBucketType: this.movebucket.upperBucketType
        }
        console.log(params)
        movebucket(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '移动成功！',
              type: 'success'
            })
            this.movebucket = {
              belowBucket: '',
              upperBucket: '',
              upperBucketType: ''
            }
            this.showMove = false
            this.fetchData()
          } else {
            this.$message({
              message: '移动失败，请确认后重试！',
              type: 'error'
            })
            this.fetchData()
          }
        })
      },
      deleteduplicate(data) {
        // 将数组进行排序
        data.sort()
        // 定义结果数组
        console.log(data)
        var arr = []
        arr.push(data[0])
        for (var i = 1; i < data.length; i++) { // 从数组第二项开始循环遍历数组
          // 判断相邻两个元素是否相等，如果相等说明数据重复，否则将元素写入结果数组
          console.log(data[i])
          if (data[i] !== arr[arr.length - 1]) {
            arr.push(data[i])
          }
        }
        return arr
      },
      handleadd(data, belowtype) {
        console.log(data)
        this.showAdd = true
        this.upperBucket.name = data.name
        this.upperBucket.type = data.type
        this.newrack.bucketType = belowtype
      },
      addbucket() {
        console.log(this.row)
        let params = {
          action: 'addAndMove',
          belowBucket: this.newrack.bucketName,
          belowBucketType: this.newrack.bucketType,
          upperBucket: this.upperBucket.name,
          upperBucketType: this.upperBucket.type
        }
        movebucket(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增成功！',
              type: 'success'
            })
            this.newrack = {
              bucketName: '',
              bucketType: ''
            }
            this.upperBucket = {
              name: '',
              type: ''
            }
            this.showAdd = false
            this.fetchData()
          } else {
            this.$message({
              message: '新增失败，请确认后重试！',
              type: 'error'
            })
            this.fetchData()
          }
        })
      },
      cellHover({ row, column, rowIndex, columnIndex }) {
        if (this.row && this.col) {
          if (this.row === row && this.col === column) {
            return 'background-color: #bedcf7'
          } else {
            return 'background-color: white'
          }
        } else {
          return 'background-color: white'
        }
      },
      cellMouseEnter(row, column, cell, event) {
        this.row = row
        this.col = column
      },
      cellMouseLeave(row, column, cell, event) {
        this.row = null
        this.col = null
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 1) {
          const _row = this.dataSpan[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 2) {
          const _row = this.roomSpan[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 3) {
          const _row = this.rowSpan[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 4) {
          const _row = this.rackSpan[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 5) {
          const _row = this.hostSpan[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    padding-top 20px
    margin-left 51px
    margin-right 48px
    margin-bottom 50px
    .title
      margin-top 20px
      font-weight bolder
      color: #333
    .rackbox
      padding-top 15px
      margin-top 10px
      margin-bottom 20px
      background-color white
      border 1px solid #ebeef5
      width: 100%
    .my-button.el-button--primary
      background-color #1262AA
      border-color #1262AA
    .my-button.el-button--primary:focus, .my-button.el-button--primary:hover
      background-color #2078C5
      border-color #2078C5
    .my-button.el-button--primary.is-disabled, my-button.el-button--primary.is-disabled:focus, my-button.el-button--primary.is-disabled:hover
      background-color #a0cfff
      border-color #a0cfff
      color: #fff
    .form
      margin-top  10px
      margin-left 5%
      .label
        display: inline-block;
        width: 120px;
        text-align: right
    .cell-hover
      background-color #bedcf7
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .table-class
    text-align center
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td
      background-color: white
    .el-table--enable-row-hover .el-table__body tr:hover>td
      background-color: white
</style>
