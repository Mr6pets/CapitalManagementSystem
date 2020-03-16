<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item label="按时间筛选">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity=='manager'"
            @click="handleAdd()"
          >添加</el-button>
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
              v-if="user.identity=='manager'"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              icon="delete"
              type="danger"
              v-if="user.identity=='manager'"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- element分页 -->
      <el-row>
        <el-row :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-row>
      </el-row>
    </div>
    <Dialog :dialog="dialog" :dialogFormData="dialogFormData" @update="getProfile" />
  </div>
</template>  
<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundlist",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTableData: [], // 筛选的时候，用来过滤
      //分页数据
      paginations: {
        page_index: 1, //当前在那页
        total: 6, //总页数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页里面存放的属性
      },
      alltableData: [],
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      //组件dialog要用的数据
      dialogFormData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }
    };
  },
  computed: {
    //从vuex中拿下用户信息
    user() {
      return this.$store.getters.user;
    }
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
        .get("/api/profiles")
        .then(res => {
          this.alltableData = res.data;
          this.filterTableData = res.data;
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //设置分页数据
    setPaginations() {
      //分页属性设置 初始化
      this.paginations.total = this.alltableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      //将请求过来的所有数据存放在大的容器中，通过当前一页显示多少过滤到显示的容器中
      this.tableData = this.alltableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleAdd() {
      //点击添加按钮发生的事
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.dialogFormData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleEdit(index, row) {
      console.log(row);
      //点击编辑按钮
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      //点击编辑的时候，让拿到的这一行的信息赋值
      this.dialogFormData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      //点击删除按钮执行方法
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功!");
        this.getProfile();
      });
    },
    handleSizeChange(page_size) {
      // console.log(page_size);
      // 改变一页显示几条的函数
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.alltableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      //说明 这里的操作 完全没有理清楚思绪
      //参数page是点击的页码 第一页 第二页
      //获取当前页 小标？？ page_size:一页显示多少条（5） *第二页（2）
      let index = this.paginations.page_size * (page - 1);
      // console.log(index);
      //数据总数
      let nums = this.paginations.page_size * page;
      // console.log(nums);

      //设定一个临时容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.alltableData[i]) {
          tables.push(this.alltableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        //如果这2个时间任意一个都是空 那就给提示
        this.$message({
          type: "warning",
          message: "请选择时间"
        });
        this.getProfile();
        return;
      }
      //获取带开始时间
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();

      this.alltableData = this.filterTableData.filter(item => {
        let date = new Date(item.date); //拿到遍历里面的时间初始化
        let time = date.getTime();
        return time >= sTime && time <= eTime; //将对象中的大于开始时间并且小于结束时间的数据留下来
      });

      //分页数据
      this.setPaginations();
    }
  },
  components: {
    Dialog
  }
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






