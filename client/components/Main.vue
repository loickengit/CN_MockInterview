<template>
  <div id="main">
    <router-view></router-view>
		<Header></Header>
    <img src="../assets/logo.png">
    <router-view/>
		<el-tabs type="border-card" style="width: 500px; margin: 0 auto;">
			<el-tab-pane label="addInterview"><addInterview></addInterview></el-tab-pane>
			<el-tab-pane label="addFeedback"><addFeedback></addFeedback></el-tab-pane>
			<el-tab-pane label="getFeedback"><getFeedback></getFeedback></el-tab-pane>
		</el-tabs>
  </div>
</template>

<script>
	import Header from '../components/header.vue'
	import addInterview from '../components/addInterview.vue'
	import addFeedback from '../components/addFeedback.vue'
	import getFeedback from '../components/getFeedback.vue'
	
export default {
	components:{
		Header,
		addInterview,
		addFeedback,
		getFeedback
	},
  name: 'Main'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
