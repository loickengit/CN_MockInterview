<template>
	<div class="addInterview">
		<el-button @click="visible = true">Enter an interview</el-button>
		   <el-dialog :visible.sync="visible" title="NEW PRACTICE INTERVIEW">
					<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="150px" >
						<el-form-item label="Subject" prop="subject">
							<el-select v-model="ruleForm.subject" placeholder="Please choose one subject" style="float:left;width: 100%;">
								<el-option :label="subject1" value="Data Structures and Algorithms"></el-option>
								<el-option :label="subject2" value="Testing"></el-option>
								<el-option :label="subject3" value="Back end"></el-option>
								<el-option :label="subject4" value="Front end"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="Slot" required>
							<el-col :span="11" >
								<el-form-item prop="date1">
									<el-date-picker type="date" :picker-options="pickerOptions"  placeholder="Choose date" v-model="ruleForm.date1"  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
								<el-form-item prop="date2">
									<el-time-picker format='HH:mm' value-format="HH:mm" placeholder="Choose time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm" >Create</el-button>
							<el-button @click="resetForm">Reset</el-button>
						</el-form-item>
				</el-form>
		    </el-dialog>
		    <h1>
				<span>{{ruleForm.subject}}</span>
				<span>{{ruleForm.date1}}</span>
				<span>{{ruleForm.date2}}</span>
		    </h1>
	</div>
</template>

<script>
	export default {
		name: 'addInterview',
		data() {
			return {
					labelPosition:"left",
					visible: false,
					ruleForm: {         
						subject: '',
						date1: '',
						date2: '',
					},
					pickerOptions: {
					    disabledDate(time) {
							return time.getTime() < Date.now() - 8.64e7;
					    }
					},
					rules: {			
						subject: [{ required: true, message: 'Please select one subject', trigger: 'change' }],
						date1: [{  required: true, message: 'Please pick a date', trigger: 'change' }],
						date2: [{ required: true, message: 'Please pick a time', trigger: 'change' }]
					}
			};
		},
		methods: {
			submitForm(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {			
						this.addInterview();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				console.log(1);
				},
			async addInterview() {
				var subject = this.ruleForm.subject;
				var date = this.ruleForm.date1.toString()+" "+this.ruleForm.date2+":00";
				this.$http.post('/api/user/addInterview', {
					subject: subject,
					datetime: date
				},{}).then((response) => {
						console.log(response);
						this.visible = false;
						alert('submit success!!');
				})
			},
			resetForm() {
			  this.$refs['ruleForm'].resetFields();   
			}
		}
	}
</script>

<style>

</style>
