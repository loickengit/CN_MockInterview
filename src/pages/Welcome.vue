<template>
  <div id="welcome">
    <router-view></router-view>
    <el-container>
      <el-header></el-header>
      <el-main id="mainPane">
        <img src="../assets/logo.png" style="width: 20%; height: 20%" />
        <h1>欢迎来到模拟面试平台！</h1>
        <el-tabs type="border-card" style="width: 500px; margin: 0 auto;">
          <el-tab-pane label="登录">
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="邮箱" prop="uid">
                <el-input v-model="loginForm.uid" placeholder="请输入邮箱" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upsw">
                <el-input
                  v-model="loginForm.upsw"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-button style="width:20%" @click="login()">登录</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-form
              :model="signForm"
              :rules="signRules"
              ref="signForm"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="邮箱" prop="uid">
                <el-input v-model="signForm.uid" placeholder="请输入邮箱" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upsw">
                <el-input
                  v-model="signForm.upsw"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-button style="width:20%" @click="addUser()">注册</el-button>
              <el-link type="primary" style="float:right;margin-top:10px">忘记密码></el-link>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Welcome",
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
      loginForm: {
        uid: "",
        upsw: ""
      },
      loginRules: {
        uid: [{ validator: checkEmail, trigger: "blur" }],
        upsw: [{ required: true, message: "密码不能为空", trigger: "change" }]
      },
      signForm: {
        uid: "",
        upsw: ""
      },
      signRules: {
        uid: [{ validator: checkEmail, trigger: "blur" }],
        upsw: [{ required: true, message: "密码不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    async addUser() {
        this.$refs.signForm.validate(valid => {
        if (valid) {
      var name = "用户" + this.signForm.uid;
      var email = this.signForm.uid;
      var password = this.signForm.upsw;
      this.$http
        .post(
          "/api/user/addUser",
          {
            username: name,
            email: email,
            password: password
          },
          {}
        ).then(response => {
          console.log(response);
          alert("注册成功！请以此账号进行登录！")
        })}})
    },
    async login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          var email = this.loginForm.uid;
          var password = this.loginForm.upsw;
          this.$http
            .post(
              "/api/user/authUser",
              {
                email: email,
                password: password
              },
              {}
            )
						.then(response =>{
              console.log(response.data)
							if(response.data.code == 'correct'){
                localStorage.setItem("USERID",response.data.data[0].id);
                localStorage.setItem("USERNAME",response.data.data[0].name);
								localStorage.setItem("USEREMAIL",email);
								localStorage.setItem("MIState", 1); // 指定登录状态
                localStorage.setItem("ISWAITING", 0);
                localStorage.setItem("PARTNER", -1);
                localStorage.setItem("HASH", "");
								this.$router.push({ path: "/main" });
							}
						});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancle() {
      this.visible = false;
    }
  }
};
</script>
<style>
#welcome {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 25%;
  margin-right: 25%;
}
.el-input {
  margin-bottom: 10px;
}
</style>
