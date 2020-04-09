<template>
  <div id="forum">
    <router-view></router-view>
    <Header></Header>
    <el-card
      class="box-card"
      style="float: left;width: 40%;margin-left: 20px;margin-top: 10px;position: relative;z-index:999;top:0;"
    >
      <div slot="header" class="clearfix">
        <span>来发帖吧！</span>
        <el-button style="float:right" type="primary" @click="sendPost()">发布</el-button>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="40px "
        style="width:100%;margin:10px"
      >
        <el-form-item label="标题" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input id="content" type="textarea" :rows="17" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-row style="height:50%">
        <el-col :span="12" style="margin:10px;margin-left:60px">
          <div v-for="(item,i) in list.slice((curPage-1)*4,curPage*4)" :key="i">
            <el-card shadow="hover" style="font-size:20px;margin-bottom:15px">
              <el-collapse>
                <el-collapse-item :title="item.title" style="font-weight:bold" name="2">
                  <div>{{item.content}}</div>
                </el-collapse-item>
              </el-collapse>
              <span style="float:left;font-size:15px;margin-top:5px">{{item.name}}</span>
              <i class="el-icon-star-off"></i>
              <i class="el-icon-chat-line-square"></i>
            </el-card>
          </div>
        </el-col>
        <div class="pagination" style="float:right;margin-right:20%">
          <el-button v-if="curPage>1" @click="curPage--">上一页</el-button>
          <span style="margin:10px">{{curPage}}/{{pageSum}}</span>
          <el-button v-if="curPage<pageSum" @click="curPage++">下一页</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  components: {
    Header
  },
  name: "Forum",
  data() {
    return {
      pageSum: 2,
      curPage: 1,
      form: {
        name: "",
        content: ""
      },
      list: [
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" },
        { title: "ok", content: "okkk", name: "okkk" }
      ],
      formRules: {
        name: [{ required: true, message: "标题不能为空", trigger: "change" }],
        content: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ]
      }
    };
  },
  mounted: function() {
    this.getPosts();
  },
  methods: {
    getPosts: function() {
      var _this = this;
      this.$http.get("/api/post/getPosts").then(response => {
        console.log(response);
        var data=response.data;
        _this.list = data;
        _this.pageSum = Math.ceil(data.length / 4);
        _this.$set("pageSum", Math.ceil(data.length / 4));
        console.log(_this.pageSum);
        console.log(_this.list);
      });
    },
    getCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      var hour = now.getHours(); //得到小时
      var minu = now.getMinutes(); //得到分钟
      var sec = now.getSeconds(); //得到秒
      var MS = now.getMilliseconds(); //获取毫秒
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      if (MS < 100) MS = "0" + MS;
      var arr_week = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      week = arr_week[day];
      var time = "";
      time =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        " " +
        hour +
        ":" +
        minu +
        ":" +
        sec;
      return time;
    },
    async sendPost() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var id = localStorage.getItem("USERID");
          var title = this.form.name;
          var content = this.form.content;
          var _this = this;
          this.$http
            .post(
              "/api/post/addPost",
              {
                id: id,
                title: title,
                content: content,
                time: this.getCurrentDate()
              },
              {}
            )
            .then(response => {
              console.log(response);
              alert("发帖成功！");
              _this.getPosts();
            });
        }
      });
    },
    cancle() {
      this.visible = false;
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
i {
  float: right;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>