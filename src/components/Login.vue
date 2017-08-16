<template>
  <div>
  <h2>登陆</h2>
  <hr>
  <div class="login-body" v-if="this.$store.state.token==''">
    <div class="control-group">
        <label>用户名</label>
      	<input type="string" class="form-control" v-model="username" placeholder="请输入用户名">
    </div>
   

    <div class="control-group">
        <label>密码</label>
      	<input type="password" class="form-control" v-model="password" placeholder="密码">
    </div>
    <div class="button-group">
    <button class="btn btn-primary" @click="login()">登陆</button>
    </div>
  </div>
  <div v-else>
    <div class="button-group">
    <button class="btn btn-primary" @click="logout()">登出</button>
    </div>
  </div>
  </div>
 </template>


 <script>
   export default{
      data(){
        return {
          username: '',
          password: ''
        }
      },
   	  methods:{
   	  	login(){
          this.$store.dispatch('login', {username: this.username, password: this.password}).then(res => {
            if(res.data.success){
              this.$router.push(decodeURIComponent(this.$route.query.redirect || '/'));
            }
          }).catch(err => {
            this.$alert('登陆失败');
          })
        },
        logout(){
          this.$store.dispatch('logout').then(res => {
            this.$router.push('/');
          })
        }
   	  }
   }
 </script>
 <style>
   .login-body{
   	  padding-left: 25%;
   	  padding-right: 25%;
   }
   .button-group{
   	  padding-top: 10px;
   }
 </style>