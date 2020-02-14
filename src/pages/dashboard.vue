<template>
  <div>
    <Header></Header>
    <h1>即将进行的面试</h1>
    <div class="row, text-center">
      <p>用来进行共享文档用户共同编辑的测试面试入口</p>
      <p>邓紫棋在等待你去面试...</p>
      <button class="btn-info btn-lg" v-on:click="joinInterview">进入面试</button>
    </div>
  </div>
</template>

<script>
  import Header from "../components/header.vue";

  export default {
    name: 'interviewList',
    components: {
      Header,
    },
    methods: {
      joinInterview () {
        console.log('join interview')

      },
    }
  }
</script>

<style scoped>

</style>
