<template>
  <div id="about">
    <router-view></router-view>
    <Header style="margin-bottom:20px"></Header>
    <h1>关于我们</h1>
    <h2>我们的愿景是将人们聚集在一起，释放他们的潜力</h2>
<h2 style="margin-left:10%;margin-right:10%">通过视频聊天和其他协作工具，智能匹配来自各地的工程师和程序员。我们使用户能够分享知识，相互学习，并为他们的下一次面试做准备。</h2>
    <div class="demo-image">
  <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
</div>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  components: {
    Header
  },
  name: "About",
  data() {
    return {
        urls: [
          'https://www.pramp.com/img/about-us/h1-bg.jpg'
        ]
      }
  }
};
</script>