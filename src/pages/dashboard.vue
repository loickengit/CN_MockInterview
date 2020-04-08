<template>
  <div id="dashboard">
    <Header></Header>
    <h1 style="font-family: 'Microsoft YaHei';font-size:30px;font-weight:bold;">即将进行的面试</h1>
    <div
      class="row, text-center"
      style="font-family: 'Microsoft YaHei';font-size:20px;font-weight:bold;"
    >
      <p>用来进行共享文档用户共同编辑的测试面试入口</p>
      <p>邓紫棋在等待你去面试...</p>

      <div id="personal">
        <el-card class="box-card" style="font-family: 'Microsoft YaHei';opacity: 0.9">
          <el-table v-if="haveInterview" :data="tableData" style="width: 100%">
            <el-table-column prop="subject" label="主题" width="260"></el-table-column>
            <el-table-column prop="name" label="伙伴" width="120"></el-table-column>
            <el-table-column prop="time" width="220" label="时间"></el-table-column>
            <el-table-column fixed="right" label="反馈">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
                <el-button @click="add(scope.$index)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="isSubmit">
            <div v-if="havePartner">
              <h3>成功匹配到面试搭档！请尽快加入面试！</h3>
              <el-button type="primary" v-on:click="joinInterview">进入面试</el-button>
            </div>
            <h3 v-else>匹配中，请稍候...</h3>
          </div>
          <h3 v-else>你还未申请面试</h3>
        </el-card>
      </div>
    </div>

    <el-dialog :visible.sync="visible" title="面试反馈">
      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="type" label="Type"></el-table-column>
        <el-table-column prop="evaValue" label="Rating">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.evaValue" :allow-half="true" disabled text-color="#ff9900"></el-rate>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="visiblefeedback" title="FEEDBACK FOR YOUR PEER">
      <el-form ref="form1" :model="form1" :label-position="labelPosition" label-width="150px">
        <el-form-item label="Coding">
          <el-rate
            v-model="coding"
            :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']"
            show-text
          ></el-rate>
        </el-form-item>
        <el-form-item label="Communication">
          <el-rate
            v-model="communication"
            :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']"
            show-text
          ></el-rate>
        </el-form-item>
        <el-form-item label="Solution">
          <el-rate
            v-model="solution"
            :texts="['Poor', 'Disappointed', 'Good', 'Satisfied', 'Surprise']"
            show-text
          ></el-rate>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFeedback">Submit</el-button>
          <el-button @click="cancle">Cancle</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  name: "interviewList",
  components: {
    Header
  },
  data() {
    return {
      tableData: [],
      haveInterview: false,
      havePartner: false,
      isSubmit: false,
      visible: false,
      visiblefeedback: false,
      labelPosition: "left",
      coding: null,
      hash: "",
      communication: null,
      solution: null,
      tableData1: [
        {
          type: "coding",
          evaValue: 1
        },
        {
          type: "communication",
          evaValue: 2
        },
        {
          type: "solution",
          evaValue: 3
        }
      ]
    };
  },
  mounted: function() {
    var _this=this;
    this.$nextTick(function() {
      //this.selectInterview();
      if (localStorage.getItem("ISWAITING") == 1) {
        this.isSubmit = 1;
        if (localStorage.getItem("PARTNER") == -1) {
          //轮询

          var timer = setInterval(function() {
            _this.$http.get("/api/user/checkPair").then(response => {
              console.log("checkPair");
              console.log(response.data.ret);
              if(response.data.ret==true){
              clearInterval(timer);
              _this.havePartner=true;
              }
            });
          }, 4000);
        } else this.havePartner = true;
      }
    });
  },
  methods: {
    joinInterview() {
      console.log("join interview");
      this.$router.push({ path: "/coding#" + localStorage.getItem("HASH")});
    },
    add(res) {
      localStorage.setItem("InterviewID", this.tableData[res].name);
      this.visiblefeedback = true;
    },
    async addFeedback() {
      var coding = this.coding;
      var communication = this.communication;
      var solution = this.solution;
      let uid = localStorage.getItem("USERID");
      let pid = localStorage.getItem("InterviewID");
      this.$http
        .post(
          "/api/user/addFeedback",
          {
            coding: coding,
            communication: communication,
            solution: solution,
            intervieweeId: pid,
            interviewerId: uid
          },
          {}
        )
        .then(response => {
          console.log(response);
          this.visible = false;
          alert("Rating success!!");
        });
    },
    async selectInterview() {
      let uid = localStorage.getItem("USERID");
      this.$http
        .post(
          "/api/user/selectInterview",
          {
            intervieweeId: uid
          },
          {}
        )
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            let data = response.data[i];
            var subject = data.subject;
            var name = data.interviewerId;
            var time = data.date;
            var state = false;
            if (data.state == 2) {
              state = true;
            }
            if (subject != "") {
              this.tableData.push({
                subject: subject,
                name: name,
                time: time,
                state: state
              });
              this.haveInterview = true;
            } else {
              break;
            }
          }
        });
    },
    cancle() {
      this.visiblefeedback = false;
    },
    async handleClick(res) {
      if (this.tableData[res].state) {
        let uid = localStorage.getItem("USERID");
        let pId = this.tableData[res].name;
        this.$http
          .post(
            "/api/user/selectFeedback",
            {
              intervieweeId: uid,
              interviewerId: pId
            },
            {}
          )
          .then(response => {
            let data = response.data[0];
            this.tableData1[0].evaValue = data.coding;
            this.tableData1[1].evaValue = data.communication;
            this.tableData1[2].evaValue = data.solution;
            console.log(response);
          });
        this.visible = true;
      } else {
        alert("对不起，您的伙伴还没填写反馈");
      }
    }
  }
};
</script>

<style scoped>
.board {
  /*display: in;*/
  /*left: 10%;*/
  width: 90%;
  border-collapse: collapse;
}
#personal {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.box-card {
  width: 800px;
}
#dashboard {
  background: url("../assets/h1-bg.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  opacity: 0.7;
}
</style>
