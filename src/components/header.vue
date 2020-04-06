<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#545c64"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/main">
      <img src="../assets/logo.png" style="height:100%" />
    </el-menu-item>
    <el-menu-item index="/main">主页</el-menu-item>
    <!--<el-submenu index="2">
      <template slot="title">Favorite</template>
      <el-menu-item index="2-1">Font-end</el-menu-item>
      <el-menu-item index="2-2">Back-end</el-menu-item>
    </el-submenu>-->
    <el-menu-item index="/personal">个人空间</el-menu-item>
    <el-menu-item index="/dashboard">面试记录</el-menu-item>
    <el-menu-item index="/forum">经验交流</el-menu-item>
    <el-menu-item index="/upload">贡献题目</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <el-menu-item index="7" style="float:right;" @click="logout">退出登录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    async logout() {
      localStorage.setItem("MIState", 0);
      this.$router.push({ path: "/" });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);

      this.$router.push({ path: key });

      /*
        if (key == "/personal") {
          this.$router.push({path: "/personal"})
        }
        if (key == 3) {
          this.$router.push({path: "/about"})
        }
        if (key == 4) {
          this.$router.push({path: "/dashboard"})
        }
        if (key == 5) {
          this.$router.push({path: "/forum"})
        }
        if (key == 6) {
          this.$router.push({path: "/upload"})
        }
*/
    }
  }
};
</script>

<style>
</style>
