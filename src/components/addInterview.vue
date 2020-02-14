<template>
  <div class="addInterview">
	  <el-card class="box-card" style="font-family: 'Microsoft YaHei';font-size:30px;font-weight:bold;opacity:0.7;width:40%;margin-left:30%">
		  现在开始属于你的模拟面试吧！
		  <el-button @click="visible = true" style="margin-top:2%;font-family: 'Microsoft YaHei';font-size:20px;font-weight:bold">预约面试</el-button>
	  </el-card>
    <el-dialog :visible.sync="visible" title="NEW PRACTICE INTERVIEW">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-position="labelPosition"
        label-width="150px"
      >
        <el-form-item label="Subject" prop="subject">
          <el-select
            v-model="ruleForm.subject"
            placeholder="Please choose one subject"
            style="float:left;width: 100%;"
          >
            <el-option :label="subject1" value="Data Structures and Algorithms"></el-option>
            <el-option :label="subject2" value="Testing"></el-option>
            <el-option :label="subject3" value="Back end"></el-option>
            <el-option :label="subject4" value="Front end"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Slot" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                :picker-options="pickerOptions"
                placeholder="Choose date"
                v-model="ruleForm.date1"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                format="HH:mm"
                value-format="HH:mm"
                placeholder="Choose time"
                v-model="ruleForm.date2"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Create</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addInterview",
  data() {
    return {
      labelPosition: "left",
      visible: false,
      ruleForm: {
        subject: "",
        date1: "",
        date2: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        subject: [
          {
            required: true,
            message: "Please select one subject",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        date2: [
          { required: true, message: "Please pick a time", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addInterview();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(1);
    },
    async addInterview() {
      var subject = this.ruleForm.subject;
      var date =
        this.ruleForm.date1.toString() + " " + this.ruleForm.date2 + ":00";
      let uid = localStorage.getItem("USERID");
      let uemail = localStorage.getItem("USEREMAIL");
      this.$http
        .post(
          "/api/user/addInterview",
          {
            subject: subject,
            datetime: date,
            intervieweeId: uid,
            intervieweeEmail: uemail
          },
          {}
        )
        .then(response => {
          console.log(response);
          this.visible = false;
          alert("成功预约，预约结果将通过邮件发送");
        });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>

<style>
</style>
