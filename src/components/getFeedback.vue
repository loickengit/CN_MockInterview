<template>
	<div class="getfeedback">
		<el-button @click="visible=true">Get a feedback</el-button>
		<el-dialog :visible.sync="visible" title="FEEDBACK FROM YOUR PEER">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="type" label="Type"></el-table-column>
				<el-table-column prop="evaValue" label="Rating">
					<template slot-scope="scope" >
						<el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled text-color="#ff9900"></el-rate>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name:'getfeedback',
		data() {
			return {
				coding:null,
				communication:null,
				solution:null,
				visible: false,
				tableData: [{
				  type:"coding",
				  evaValue: 1
				}, {
				  type:"communication",
				  evaValue: 2
				}, {
				  type:"solution",
				  evaValue: 3
				}]
			};
		},
		mounted:function(){
			this.$nextTick(function(){
				this.selectFeedback();
			})
		},
		methods: {
		  async selectFeedback(){
			this.$http.post('/api/user/selectFeedback', {
			  intervieweeId: 1
			},{}).then((response) => {
							let data = response.data[0];
							this.tableData[0].evaValue= data.coding;
							this.tableData[1].evaValue= data.communication;
							this.tableData[2].evaValue=data.solution;
			  console.log(response);
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
