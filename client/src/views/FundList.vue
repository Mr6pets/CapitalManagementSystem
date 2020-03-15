<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length"
        max-height="450"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="data" label="创建日期" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="120"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" prop="opetation" align="center" fixed="right" width="220">
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="edit"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>  
<script>
export default {
  name: "fundlist",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    //进入页面就执行的方法
    //拉取数据
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profile")
        .then(res => {
          // console.log(res);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(124);
    },
    handleDelete(index, row) {
      console.log(567);
    }
  },
  components: {}
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>






