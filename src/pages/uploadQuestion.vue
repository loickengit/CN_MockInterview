<template>
  <div id="uploadQuestion">
    <router-view></router-view>
    <Header></Header>
    <el-form
      ref="form"
      :model="form"
      :rules="formRules"
      label-width="80px "
      style="width:70%;margin:20px"
    >
      <el-form-item label="题目名称" style="width:50%">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="题目考点">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="树" name="type"></el-checkbox>
          <el-checkbox label="图论" name="type"></el-checkbox>
          <el-checkbox label="排序" name="type"></el-checkbox>
          <el-checkbox label="动态规划" name="type"></el-checkbox>
          <el-checkbox label="字符串" name="type"></el-checkbox>
          <el-checkbox label="链表" name="type"></el-checkbox>
          <el-checkbox label="暴力" name="type"></el-checkbox>
          <el-checkbox label="数学计算" name="type"></el-checkbox>
          <el-checkbox label="分治" name="type"></el-checkbox>
          <el-checkbox label="单调栈" name="type"></el-checkbox>
          <el-checkbox label="前缀和" name="type"></el-checkbox>
          <el-checkbox label="模型匹配" name="type"></el-checkbox>
          <el-checkbox label="贪心" name="type"></el-checkbox>
          <el-checkbox label="回溯" name="type"></el-checkbox>
          <el-checkbox label="递归" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="题目内容">
        <el-input id="content" type="textarea" :rows="4" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="题目提示">
        <el-input type="textarea" v-model="form.hint"></el-input>
      </el-form-item>
      <el-form-item label="题目解答">
        <el-input type="textarea" :rows="5" v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addQuestion">立即上传</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  components: {
    Header
  },
  name: "UploadQuestion",
  data() {
    return {
      form: {
        name: "",
        content: "",
        hint: "",
        answer: "",
        type: []
      },
      formRules: {
        name: [{ required: true, message: "名称不能为空", trigger: "change" }],
        content: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ],
        hint: [{ required: true, message: "提示不能为空", trigger: "change" }],
        answer: [
          { required: true, message: "解答不能为空", trigger: "change" }
        ],
        type: [{ required: true, message: "考点不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    async addQuestion() {
      this.$refs.form.validate(valid => {
        if (valid) {
            console.log(valid);
          var name = this.form.name;
          var content = this.form.content;
          var answer = this.form.answer;
          var hint = this.form.hint;
          var types = "";
          for (var i = 0; i < this.form.type.length; i++)
            types += this.form.type[i] + ";";
          this.$http
            .post(
              "/api/question/addQuestion",
              {
                name: name,
                content: content,
                hint: hint,
                answer: answer,
                type: types
              },
              {}
            )
            .then(response => {
              console.log(response);
              alert("上传题目成功！");
            });
        }
      });
    }
  }
};
</script>
