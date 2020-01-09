<template>
  <div class="hello">
			<h1>{{ msg }}</h1>
			<form>
				<input type="text" name="username" v-model="userName" placeholder="username"> <br>
				<input type="text" name="password" v-model="password" placeholder="password"> <br>
				<a href="javascript:;" @click="addUser">上传</a>
			</form>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      age: ''
		}		
  },
  methods: {
    async addUser() {
      var name = this.userName;
      var password = this.password;
      this.$http.post('/api/user/addUser', {
        username: name,
        password: password
      },{}).then((response) => {
        console.log(response);
      })
    },
		cancle() {
		  this.visible = false;	    
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
label{
	display:inline-block;
	width:150px;
	height:75px;
	background-repeat:no-repeat;
	background-size: contain;
	margin-right:10px;
}
</style>
