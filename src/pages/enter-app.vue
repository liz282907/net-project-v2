<style lang="scss">

.container{
  background-color: #F4F4F4;
  min-width:1366px;
}
</style>

<template>
  <div >
          <main-header :cur-user="curUser" v-on:log-out="handleLogout"></main-header>
          <main class="container">
              <router-view></router-view>
          </main>
          <main-footer></main-footer>

  </div>


</template>

<script>
import MainHeader from '../components/main-header/main-header';
import MainFooter from '../components/main-footer/main-footer';
// import MyLogin from './login.vue';

import { urls } from '../../utils/constants';
// import { router } from './main';


export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
    // 'my-login': MyLogin
  },
  data(){
    const user = JSON.parse(localStorage.getItem("wxb_user"));
    return {
      curUser: (user? user:null)
      // isLogined: localStorage.getItem("user")?true:false,
    }
  },
  computed:{
    isLogined(){
      return this.curUser?true:false;
    }
  },


  methods:{
    handleLogout(){
      // debugger;
      localStorage.removeItem("wxb_user");
      this.curUser = null;

      // router.push("/login");

      const prevHref = location.href;
      const curHash = location.hash.match(/(\w+)/)[1];
      let curHref = prevHref.replace(curHash,'login');
      window.location.href = curHref ;


      this.$message({
        message: '您已退出',
        type: 'info'
      });
    }
  }
};
</script>


