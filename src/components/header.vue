<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#545c64"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0"><img src="../assets/logo.png" style="height:100%" /></el-menu-item>
    <el-menu-item index="1">主页</el-menu-item>
    <!--<el-submenu index="2">
      <template slot="title">Favorite</template>
      <el-menu-item index="2-1">Font-end</el-menu-item>
      <el-menu-item index="2-2">Back-end</el-menu-item>
    </el-submenu>-->
    <el-menu-item index="2">个人空间</el-menu-item>
    
    <el-menu-item index="4">面试记录</el-menu-item>
    <el-menu-item index="5">经验交流</el-menu-item>
    <el-menu-item index="6">贡献题目</el-menu-item>
    <el-menu-item index="3">关于我们</el-menu-item>
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
      async logout(){
          localStorage.setItem('MIState', 0);
          this.$router.push({path: "/"});
      },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key == 0 || key == 1){
         this.$router.push({path: "/main"})
      }
      if (key == 2) {
        this.$router.push({path: "/personal"})
      }
      if (key == 3) {
        this.$router.push({path: "/about"})
      }
      if (key == 4) {
        this.$router.push({path: "/dashboard"})
      }
      if (key == 6) {
        this.$router.push({path: "/upload"})
      }
      
    }
  }
};
</script>

<style>
</style>
