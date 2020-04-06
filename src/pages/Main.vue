<template>
  <div id="main" >
	  <div class="note" :style ="note"></div>
    <router-view></router-view>
    <Header></Header>
    <addInterview style ="margin-top:3%"></addInterview>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import addInterview from "../components/addInterview.vue";
import addFeedback from "../components/addFeedback.vue";
import getFeedback from "../components/getFeedback.vue";

export default {
  components: {
    Header,
    addInterview,
    addFeedback,
    getFeedback
  },
  name: "Main",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/bg.jpg") + ") ",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  }
};
</script>

<style>

 #main{
    background: url("../assets/h1-bg.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
  }
</style>
