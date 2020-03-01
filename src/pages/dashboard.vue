<template>
  <div>
    <Header></Header>
    <h1>即将进行的面试</h1>
    <div class="row, text-center">
      <p>用来进行共享文档用户共同编辑的测试面试入口</p>
      <p>邓紫棋在等待你去面试...</p>
      <button class="btn-info btn-lg" v-on:click="joinInterview">进入面试</button>

      <div>
        <table class="table table-bordered table-hover board">
          <caption>基本的表格布局</caption>
          <thead>
            <tr>
              <th>类型</th>
              <th>问题</th>
              <th>时间</th>
              <th>伙伴</th>
              <th>时间</th>
              <th>面试反馈</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="todo in todos">
              <tr>
                <td>{{todo.text}}</td>
                <td>{{todo.text}}</td>
                <td>{{todo.text}}</td>
                <td>{{todo.text}}</td>
                <td>{{todo.text}}</td>
                <td>
                  <p class="btn-info">查看</p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
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
    data() {
      return {
        todos: [
          { text: 'Learn JavaScript' },
          { text: 'Learn Vue' },
          { text: 'Build something awesome' }
        ]
      }
    },
    methods: {
      joinInterview () {
        console.log('join interview')
        this.$router.push({path: "/coding"})
      },
    }
  }
</script>

<style scoped>
  .board{
    /*display: in;*/
    /*left: 10%;*/
    width: 90%;
    border-collapse: collapse;
  }
</style>
