<style lang="scss">
@import './assets/styles/common/index.scss';
@import "./assets/styles/fonts/iconfont.css";
@import './assets/styles/components/index.scss';
@import './assets/styles/pages/index.scss';

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
  <!--
      <div v-if="isLogined">
          <main-header :cur-user="curUser"></main-header>
          <main class="container">
              <router-view></router-view>
          </main>
          <main-footer></main-footer>
      </div>
      <main v-else class="container">
          <my-login></my-login>
      </main>
      -->
  </div>


</template>

<script>
import MainHeader from './components/main-header/main-header';
import MainFooter from './components/main-footer/main-footer';
import MyLogin from './pages/login';

import { urls } from '../utils/constants';

export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
    'my-login': MyLogin
  },
  data(){
    const user = localStorage.getItem("wxb_user");
    return {
      curUser: (user? user:null)
      // isLogined: localStorage.getItem("user")?true:false,
    }
  },
  computed:{
    isLogined(){
      console.log("--localStorage--",localStorage.getItem("wxb_user"));
      return this.curUser?true:false;
    }
  },

  methods:{
    handleLogout(){
      // debugger;
      localStorage.removeItem("wxb_user");
      this.curUser = null;
      const prevHref = location.href;
      const curHash = location.hash.match(/(\w+)/)[1];
      let curHref = prevHref.replace(curHash,'login');
      // window.location.href.replace(curHref);
      window.location.href = curHref ;
      // window.location.hash.replace('login');


      this.$message({
        message: '您已退出',
        type: 'info'
      });
    }
  }
};
</script>


