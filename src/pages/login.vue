<template>
  <div>
    <div class='img-container' style="width:628px;">
        <img src="../assets/images/login-logo.png"/>
    </div>
    <div class='img-container' style="width:682px;margin-top:50px">
        <img src="../assets/images/login-title.png"/>
    </div>
    <div class='img-container' style="width:103px;margin-top:50px">
        <img src="../assets/images/login-user.png"/>
    </div>
    <div class='img-container' style="width:450px;height:200px;margin-top:50px;">
        <el-alert :title="errMsg" type="error" style="height:40px" v-if="errMsg"></el-alert>
        <div class="input-div">
                <span class="icon">♙</span>
                <input id="login_user" type="text" autocomplete="off" name="username" v-model="user.name"></input>
            </div>
            <div class="input-div">
                <span class="icon">♖</span>
                <input id="login_key" type="password" autocomplete="off" name="password" v-model="user.password"></input>
            </div>
        <button class="button" @click="login">登录</button>
    </div>

  </div>


</template>

<script>
import { urls } from '../../utils/constants.js';
import { replaceHash } from '../../utils/util';
import  router  from '../route.config';

export default {
    name: "my-login",
    data(){
      return{
        errMsg:"",
        user:{
          name:"",
          password:""
        }
      }
    },
    methods:{
      login(){
        this.$http.post(urls.login,this.user).then(response=>{
          let status = response.body.code;
          if(status!==-1){
              this.errMsg = "";
              localStorage.setItem("user",JSON.stringify(response.body));

              router.replace("/management");

          }else{
              this.errMsg = "用户名或密码错误，请重试";
              localStorage.removeItem("user");
          }
        },err=>{
            console.log(err);
        })
      },
    },
    mounted() {

    }
};
</script>

<style>

</style>
