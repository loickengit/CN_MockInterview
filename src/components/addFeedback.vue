<template>
	<div class="addFeedback">
		<el-button @click="visible = true">Give a feedback</el-button>
		<el-dialog :visible.sync="visible" title="FEEDBACK FOR YOUR PEER">
			<el-form ref="form1" :model="form1" :label-position="labelPosition" label-width="150px">
				<el-form-item label="Coding">
					<el-rate  v-model="coding" :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']" show-text> </el-rate>
				</el-form-item>
				<el-form-item label="Communication">
					<el-rate  v-model="communication" :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']" show-text> </el-rate>
				</el-form-item>
				<el-form-item label="Solution">
					<el-rate  v-model="solution" :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']" show-text> </el-rate>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addFeedback">Submit</el-button>
						<el-button @click="cancle">Cancle</el-button>
					</el-form-item>
			</el-form>
		</el-dialog>
		<h1>Coding is:{{coding}}</h1>
		<h1>Communication is:{{communication}}</h1>
		<h1>Solution is:{{solution}}</h1>
	</div>
</template>

<script>
	export default {
		name:'addFeedback',
		data() {
			return {
				labelPosition:"left",
        coding:null,
        communication:null,
        solution:null,
        visible: false
			};
		},
		methods: {
			async addFeedback() {
			  var coding = this.coding;
			  var communication = this.communication;
			  var solution = this.solution;
			  let uid = localStorage.getItem("USERID");
			  this.$http.post('/api/user/addFeedback', {
			    coding: coding,
			    communication: communication,
				solution:solution,
				intervieweeId:uid
			  },{}).then((response) => {
			    console.log(response);
					this.visible = false;
					alert('Rating success!!');
			  })

			},
		  cancle() {
		    this.visible = false;
		  }
		}
	}
</script>

<style>

</style>
