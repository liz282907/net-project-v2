<template>
  <div class="header-wrapper clearfix">
      <h1 class="logo">关键词</h1>
      <ul class="nav clearfix">
        <li v-for="item in navList" class="nav-item">
            <router-link :to="item.url">{{item.zh_name}}</router-link>
        </li>
        <li class="nav-item" v-if="curUser && curUser.auth===0">
            <router-link to="/app/sys-management">系统管理</router-link>
        </li>

      </ul>
    <div class="header-right clearfix">
    <!--
      <span class="nav-item user-photo">
          luchen
      </span>ff
      -->
      <el-dropdown >
        <span class="el-dropdown-link">
          <span class="username" >{{curUserName}}</span><i class="el-icon-caret-bottom el-icon-right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item @click.native="logOut"
            v-if="isLogined">退出</el-dropdown-item>
            <el-dropdown-item v-else >登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
import { navList } from '../../../utils/constants';


export default {

  props: ['curUser'],
  data() {
    return {

      navList,
      // curUser: "luchen"

    };
  },


  computed:{

    curUserName(){

      return this.curUser? this.curUser.name:"";
      // return this.$parent.curUser? this.$parent.curUser.name:"";
    },

    isLogined(){
      return this.curUser?true: false;
    }

    // curUser(){
    //   const user = localStorage.getItem("user");
    //   console.log("-----------",user);
    //   if(user)
    //     return JSON.parse(user).name;
    //   else return "";
    // }
  },

  created(){

    // this.$on("header-hide",this.hideHeader);
  },
  mounted(){
    console.log("header",this.curUser);
  },


  methods:{
    logOut(){
      this.curUserName = "";
      this.$emit("log-out");
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">





</style>
