<template>
  <div id="personalSpace">
    <router-view></router-view>
    <Header></Header>
    <el-form
              :model="updateForm"
              :rules="updateRules"
              ref="updateForm"
              label-width="80px"
              class="demo-ruleForm"
              style="width:60%;margin-left:20%;margin-top:10%"
            >
              <el-form-item label="邮箱" prop="uid">
                <el-input :disabled="true" v-model="updateForm.uid" placeholder="请输入邮箱" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="uname">
                <el-input  v-model="updateForm.uname" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upsw">
                <el-input
                  v-model="updateForm.upsw"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-button style="width:20%" @click="update()">修改信息</el-button>
            </el-form>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  components: {
    Header
  },
  name: "PersonalSpace",
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (!myReg.test(value)) {
          return callback(new Error("请输入正确格式的邮箱"));
        } else callback();
      }
      callback();
    };
    return {
      updateForm: {
        uid: localStorage.getItem("USEREMAIL"),
        uname:localStorage.getItem("USERNAME"),
        upsw: ""
      },
      updateRules: {
        uid: [{ validator: checkEmail, trigger: "blur" }],
        uname: [{ required: true, message: "用户名不能为空", trigger: "change" }],
        upsw: [{ required: true, message: "密码不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    async update() {
        this.$refs.updateForm.validate(valid => {
        if (valid) {
      var name =  this.updateForm.uname;
      var id = localStorage.getItem("USERID");
      var password = this.updateForm.upsw;
      this.$http
        .post(
          "/api/user/updateUser",
          {
            name: name,
            id: id,
            password: password
          },
          {}
        ).then(response => {
          console.log(response);
          alert("修改信息成功！")
          localStorage.setItem("USERNAME",name);
        })}})
    },
    cancle() {
      this.visible = false;
    }
  }
};
</script>