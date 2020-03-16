<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="true"
      :close-on-press-escape="false"
      :model-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="dialogFormData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="收支类型">
            <el-select v-model="dialogFormData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype,index) in dialog_form_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述:" prop="describe">
            <el-input type="describe" v-model="dialogFormData.describe"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="dialogFormData.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="dialogFormData.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="dialogFormData.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="dialogFormData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="dialog.show=false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>  
<script>
export default {
  name: "dialog",
  data() {
    return {
      dialog_form_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      //校验
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    };
  },
  props: {
    dialog: Object,
    dialogFormData: Object
  },
  components: {},
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log(this.dialogFormData);
          //判断点击的是添加按钮 还是编辑按钮
          const url =
            this.dialog.option == "add"
              ? "add"
              : `edit/${this.dialogFormData.id}`;
          this.$axios
            .post(`/api/profiles/${url}`, this.dialogFormData)
            .then(res => {
              if (url == "add") {
                //添加成功执行的事情
                this.$message({
                  message: "数据添加到了数据库",
                  type: "success"
                });
              } else {
                //添加成功执行的事情
                this.$message({
                  message: "数据修改成功",
                  type: "success"
                });
              }
            });
          //执行完毕 隐藏dialog
          this.dialog.show = false;
          //添加到数据库中 注册事件，让父级执行重新请求的方法
          this.$emit("update");
        }
      });
    }
  }
};
</script>
<style scoped>
</style>






