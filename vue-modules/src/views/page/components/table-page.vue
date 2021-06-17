<template>
  <div class="home-page">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="案件名称：">
          <el-input v-model="formInline.name" placeholder="案件名称"></el-input>
        </el-form-item>
        <el-form-item label="分配方式：">
          <el-select v-model="formInline.fpfs" placeholder="分配方式" clearable>
            <el-option label="手动分配" value="sd"></el-option>
            <el-option label="自动分配" value="zd"></el-option>
            <el-option label="未分配" value="wfp"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute; right:30px; top:50%; transform:translateY(-50%);">
          <el-button type="primary" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%" class="table">
      <el-table
        class="eltable-ui"
        :data="tableData"
        border
        v-loading="loading"
        :header-cell-style="{
            'text-align': 'center',
            background: '#519dfbf5',
            color: '#fff',
          }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="bmsah" label="部门受案号" align="left" width="280"></el-table-column>
        <el-table-column prop="xfrxm" label="信访人"></el-table-column>
        <el-table-column prop="zjhm" label="身份证号" width="220"></el-table-column>
        <el-table-column prop="xfsj" label="信访时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.xfsj | date("yyyy-MM-dd") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xffsMc" label="信访方式"></el-table-column>
        <el-table-column prop="sqlxMc" label="信访类型"></el-table-column>
        <el-table-column prop="xfqxMc" label="信访情绪"></el-table-column>
        <el-table-column prop="xfjgMc" label="信访结果"></el-table-column>
        <el-table-column prop="fxdjMc" label="风险等级"></el-table-column>
        <el-table-column prop="cbdwMc" label="承办单位" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="cbr" label="承办人"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="scope.row.sfsdAdd == 'Y' && scope.row.cbdwBm == dwbm"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.sfsdAdd == 'Y' && scope.row.cbdwBm == dwbm"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        @current-change="getTableData"
        :current-page.sync="page"
        :page-size="pageSize"
        style="float: right; margin-top: 20px"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      formInline: {
        name: null,
        fpfs: null
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    getTableData() {
      console.log(this.formInline);
    },
    tableRowClassName({ row, rowIndex }) {
      let a = [1, 3, 5, 7, 9];
      if (
        rowIndex === 1 ||
        rowIndex === 3 ||
        rowIndex === 5 ||
        rowIndex === 7 ||
        rowIndex === 9
      ) {
        return "warning-row";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
.home-page {
  height: 100%;
  .top {
    position: relative;
    height: 100px;
    padding: 0 30px;
    display: flex;
    align-items: center;
  }
  .table {
    padding: 0 30px;
    height: calc(100% - 100px);
    .eltable-ui {
      height: 90%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
